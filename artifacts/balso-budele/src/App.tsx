import { type FormEvent, useState } from 'react';
import { Route, Router as WouterRouter, Switch } from 'wouter';
import NotFound from '@/pages/not-found';
import { Mic2, MoveDown, Phone, Volume2 } from 'lucide-react';

function InterestForm() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [error, setError] = useState('');

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
        className="max-w-md border-l border-[#B08D57] py-3 pl-5 font-serif text-2xl leading-tight text-[#2B2620] page-reveal"
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
        className="mb-3 block text-xs font-medium tracking-[0.14em] text-[#6B6357]"
        data-testid="label-email"
      >
        El. paštas
      </label>
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
          className="min-h-14 flex-1 border border-[#C9BCA8] bg-[#F8F3EA] px-4 text-base text-[#2B2620] placeholder:text-[#968C7F] transition-colors hover:border-[#B08D57] focus:border-[#B08D57] focus:outline-none"
          data-testid="input-email"
        />
        <button
          type="submit"
          disabled={isSending}
          className="min-h-14 border border-[#2B2620] bg-[#2B2620] px-6 text-sm font-medium text-[#F8F3EA] transition-colors hover:border-[#B08D57] hover:bg-[#B08D57] disabled:cursor-wait disabled:opacity-60"
          data-testid="button-submit-interest"
        >
          {isSending ? 'Siunčiama' : 'Pranešti man'}
        </button>
      </div>
      {error ? (
        <p
          id="signup-error"
          className="mt-3 text-sm text-[#8C4138]"
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
  return (
    <>
      <script
        data-domain="YOUR_DOMAIN"
        src="https://plausible.io/js/script.js"
        defer
      />
      <main className="min-h-[100dvh] overflow-hidden bg-[#F8F3EA] text-[#2B2620]">
        <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-7 sm:px-10 sm:py-9 lg:px-16" data-testid="site-header">
          <a
            href="#pradzia"
            className="font-serif text-xl tracking-[-0.02em] text-[#2B2620] transition-colors hover:text-[#B08D57]"
            data-testid="link-wordmark"
          >
            Balso Būdelė
          </a>
          <span className="h-px w-16 bg-[#B08D57] sm:w-24" aria-hidden="true" />
        </header>

        <div id="pradzia" className="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">
          <section className="page-reveal pb-20 pt-20 sm:pb-28 sm:pt-28 lg:pb-36 lg:pt-36" aria-labelledby="hero-headline" data-testid="section-hero">
            <div className="max-w-4xl">
              <div className="mb-9 flex items-center gap-3 text-[#B08D57]" aria-hidden="true">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#B08D57]">
                  <Phone size={15} strokeWidth={1.25} />
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#B08D57]" />
                </span>
                <span className="h-px w-14 bg-[#B08D57]" />
                <Volume2 size={16} strokeWidth={1.25} />
              </div>
              <h1 id="hero-headline" className="max-w-4xl font-serif text-[clamp(3.25rem,9vw,7.4rem)] leading-[0.96] tracking-[-0.055em] text-[#2B2620]">
                Vieta, kur balsas tampa prisiminimu
              </h1>
              <p className="page-reveal page-reveal-delay-1 mt-9 max-w-2xl text-lg leading-[1.55] text-[#6B6357] sm:text-xl">
                Nauja koncepcija vestuvėms – elegantiška telefono būdelė, kurioje svečiai palieka balso žinutę jaunavedžiams.
              </p>
            </div>
            <a
              href="#kas-tai"
              className="page-reveal page-reveal-delay-2 mt-16 inline-flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#6B6357] transition-colors hover:text-[#B08D57]"
              data-testid="link-discover-concept"
            >
              <MoveDown size={15} strokeWidth={1.25} />
              <span>Kas tai?</span>
            </a>
          </section>

          <section className="page-reveal page-reveal-delay-2 pb-24 sm:pb-32" aria-labelledby="concept-title" data-testid="section-concept">
            <figure className="relative overflow-hidden bg-[#D8C6AD]" data-testid="figure-concept">
              <img
                src="/concept-placeholder.svg"
                alt="Balso Būdelės konceptualus vaizdas"
                className="concept-placeholder block h-auto w-full object-cover mix-blend-multiply"
                data-testid="img-concept-placeholder"
              />
              <span className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] tracking-[0.12em] text-[#F8F3EA]" aria-hidden="true">
                <Mic2 size={13} strokeWidth={1.2} />
                <span className="h-px w-8 bg-[#F8F3EA]" />
              </span>
            </figure>
            <div className="border-b border-[#D8CDBE] py-16 sm:py-20">
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
              <InterestForm />
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
