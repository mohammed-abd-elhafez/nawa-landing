import { AnnouncementBar } from './components/AnnouncementBar'
import { ContactForm } from './components/ContactForm'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Process } from './components/Process'
import { Services } from './components/Services'
import { Strip } from './components/Strip'
import { Testimonial } from './components/Testimonial'
import { Work } from './components/Work'
import { useLanguage } from './i18n/LanguageContext'

export function App() {
  const { t } = useLanguage()
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Strip />
        <Services />
        <Process />
        <Work />
        <Testimonial />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
