import { type FormEvent, useState } from 'react';
import { Route, Router as WouterRouter, Switch } from 'wouter';
import NotFound from '@/pages/not-found';
import { Mic2 } from 'lucide-react';
import conceptPhoto from '@assets/koncepcija_1788350849629.jpg';

function getSourceFromUrl() {
  if (typeof window === 'undefined') {
    return 'direct';
  }

  const source = new URLSearchParams(window.location.search).get('src')?.trim();
  return source || 'direct';
}

function InterestForm({
  source,
  variant = 'default',
}: {
  source: string;
  variant?: 'default' | 'hero';
}) {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [error, setError] = useState('');
  const isHero = variant === 'hero';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSending(true);
    setError('');

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setHasSent(true);
    } catch {
      setError('Nepavyko išsiųsti. Pabandykite dar kartą.');
    } finally {
      setIsSending(false);
    }
  }

  if (hasSent) {
    return (
      <p
        className={`max-w-md border-l border-[#B08D57] py-3 pl-5 font-serif text-2xl leading-tight page-reveal ${isHero ? 'text-[#F8F3EA]' : 'text-[#2B2620]'}`}
        role="status"
        data-testid="status-signup-success"
      >
        Ačiū! Pranešime, kai turėsime naujienų.
      </p>
    );
  }

  return (
    <form
      action="https://formspree.io/f/YOUR_ID"
      method="POST"
      onSubmit={handleSubmit}
      className="max-w-xl"
      data-testid="form-interest"
    >
      <label
        htmlFor="email"
        className={`mb-3 block text-xs font-medium tracking-[0.14em] ${isHero ? 'text-[#F8F3EA]/80' : 'text-[#6B6357]'}`}
        data-testid="label-email"
      >
        El. paštas
      </label>
      <input type="hidden" name="source" value={source} data-testid="input-source" />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="jusu@pastas.lt"
          required
          aria-describedby={error ? 'signup-error' : undefined}
          className={`min-h-14 flex-1 border px-4 text-base transition-colors focus:outline-none ${isHero ? 'border-[#F8F3EA]/55 bg-[#2B2620]/25 text-[#F8F3EA] placeholder:text-[#F8F3EA]/65 hover:border-[#F8F3EA] focus:border-[#F8F3EA]' : 'border-[#C9BCA8] bg-[#F8F3EA] text-[#2B2620] placeholder:text-[#968C7F] hover:border-[#B08D57] focus:border-[#B08D57]'}`}
          data-testid="input-email"
        />
        <button
          type="submit"
          disabled={isSending}
          className={`min-h-14 border px-6 text-sm font-medium transition-colors disabled:cursor-wait disabled:opacity-60 ${isHero ? 'border-[#B08D57] bg-[#B08D57] text-[#2B2620] hover:border-[#F8F3EA] hover:bg-[#F8F3EA]' : 'border-[#2B2620] bg-[#2B2620] text-[#F8F3EA] hover:border-[#B08D57] hover:bg-[#B08D57]'}`}
          data-testid="button-submit-interest"
        >
          {isSending ? 'Siunčiama' : 'Pranešti man'}
        </button>
      </div>
      {error ? (
        <p
          id="signup-error"
          className={`mt-3 text-sm ${isHero ? 'text-[#F7C8B9]' : 'text-[#8C4138]'}`}
          role="alert"
          data-testid="status-signup-error"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}

function Home() {
  const [source] = useState(getSourceFromUrl);

  return (
    <>
      <script
        data-domain="YOUR_DOMAIN"
        src="https://plausible.io/js/script.js"
        defer
      />
      <main className="min-h-[100dvh] overflow-hidden bg-[#F8F3EA] text-[#2B2620]">
        <section id="pradzia" className="hero-shell relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-headline" data-testid="section-hero">
          <img
            src={conceptPhoto}
            alt="Balso Būdelės konceptualus vaizdas"
            className="hero-backdrop absolute inset-0 -z-20 h-full w-full object-cover object-[35%_center] sm:object-center lg:object-[0%_center]"
            data-testid="img-concept-placeholder"
          />
          <div className="hero-overlay absolute inset-0 -z-10" aria-hidden="true" />
          <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-7 sm:px-10 sm:py-9 lg:px-16" data-testid="site-header">
            <a
              href="#pradzia"
              className="font-serif text-xl tracking-[-0.02em] text-[#F8F3EA] transition-colors hover:text-[#B08D57]"
              data-testid="link-wordmark"
            >
              Balso Būdelė
            </a>
            <span className="h-px w-16 bg-[#B08D57] sm:w-24" aria-hidden="true" />
          </header>

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 items-end px-6 pb-10 pt-16 sm:items-center sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
            <div className="hero-copy max-w-[24rem]">
              <h1 id="hero-headline" className="page-reveal max-w-[12ch] font-serif text-[clamp(3.25rem,9vw,7.4rem)] leading-[0.96] tracking-[-0.055em] text-[#F8F3EA] lg:max-w-[10ch] lg:text-[clamp(4.5rem,5vw,4.75rem)]">
                Vieta, kur balsas tampa prisiminimu
              </h1>
              <p className="page-reveal page-reveal-delay-1 mt-7 max-w-2xl text-lg leading-[1.5] text-[#F8F3EA]/85 sm:text-xl">
                Nauja koncepcija vestuvėms – elegantiška telefono būdelė, kurioje svečiai palieka balso žinutę jaunavedžiams.
              </p>
              <div className="page-reveal page-reveal-delay-2 mt-8">
                <InterestForm source={source} variant="hero" />
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">
          <section id="kas-tai" className="page-reveal pb-24 pt-20 sm:pb-32 sm:pt-28" aria-labelledby="concept-title" data-testid="section-concept">
            <div className="border-b border-[#D8CDBE] pb-16 sm:pb-20">
              <div className="mb-9 flex items-center gap-2 text-[#B08D57]" aria-hidden="true">
                <Mic2 size={15} strokeWidth={1.2} />
                <span className="h-px w-8 bg-[#B08D57]" />
              </div>
              <h2 id="concept-title" className="mb-9 font-serif text-3xl tracking-[-0.03em] sm:text-4xl">Kas tai?</h2>
              <div className="max-w-2xl divide-y divide-[#D8CDBE] text-lg leading-[1.55] text-[#6B6357]">
                <p className="py-5 first:pt-0" data-testid="text-concept-line-1">Pilno dydžio, elegantiška telefono būdelė, pritaikyta vestuvių estetikai.</p>
                <p className="py-5" data-testid="text-concept-line-2">Izoliuota nuo aplinkos triukšmo – balsas skamba aiškiai ir švariai.</p>
                <p className="py-5 last:pb-0" data-testid="text-concept-line-3">Veikia ir kaip išskirtinis dekoro elementas pačioje šventėje.</p>
              </div>
            </div>
          </section>

          <section id="susidomejimas" className="pb-28 sm:pb-40" aria-labelledby="signup-title" data-testid="section-signup">
            <div>
              <h2 id="signup-title" className="mb-9 max-w-2xl font-serif text-3xl tracking-[-0.03em] sm:text-4xl">Norite sužinoti pirmieji?</h2>
              <p className="mb-9 max-w-xl text-lg leading-[1.55] text-[#6B6357]" data-testid="text-signup-body">
                Šiuo metu tikriname susidomėjimą ir renkame nuomonę, prieš nuspręsdami dėl gamybos. Palikite el. paštą – pranešime, kai turėsime daugiau naujienų.
              </p>
              <InterestForm source={source} />
            </div>
          </section>
        </div>

        <footer className="border-t border-[#D8CDBE] px-6 py-8 sm:px-10 sm:py-10 lg:px-16" data-testid="site-footer">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 text-sm text-[#6B6357] sm:flex-row sm:items-center sm:justify-between">
            <span className="font-serif text-lg text-[#2B2620]" data-testid="text-footer-wordmark">Balso Būdelė</span>
            <a href="mailto:info@balsobudele.lt" className="transition-colors hover:text-[#B08D57]" data-testid="link-footer-email">info@balsobudele.lt</a>
          </div>
        </footer>
      </main>
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;
