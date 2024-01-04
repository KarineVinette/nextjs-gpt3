import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Form, Button, Spinner } from 'react-bootstrap'
import { FormEvent, useState } from 'react'

export default function Home() {

  const [quote, setQuote] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);

  const [formData, setFormData] = useState({
    promptNom: "",
    promptPrenom: "",
    promptDiplome: "",
    promptEntreprise: "",
    promptPoste: "",
    promptAnnonce: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { promptNom,promptPrenom,promptDiplome,promptEntreprise, promptPoste, promptAnnonce } = formData;

    if (promptNom) {
      try {
        setQuote("");
        setQuoteLoadingError(false);
        setQuoteLoading(true);

        const response = await fetch("/api/cringe", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ promptNom,promptPrenom,promptDiplome,promptEntreprise, promptPoste, promptAnnonce }) 
        });
        const body = await response.json();
        setQuote(body.quote);
      } catch (error) {
        console.error(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    } else {
      // Handle case where promptN is not provided
      console.error("Prompt is required");
    }
  }

  return (
    <>
      <Head>
        <title>Your Title Here</title>
        <meta name="description" content="Your Description Here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
         <Form onSubmit={handleSubmit} className={styles.inputForm}>
          <Form.Group className='mb-3' controlId='prompt-input'>
            <Form.Label>Lettre de motivation</Form.Label>
            <Form.Control
              name='promptNom'
              value={formData.promptNom}
              onChange={handleInputChange}
              placeholder='Nom'
              maxLength={100}
            />
            <Form.Control
              name='promptPrenom'
              value={formData.promptPrenom}
              onChange={handleInputChange}
              placeholder='Prénom'
              maxLength={100}
            />
            <Form.Control
              name='promptDiplome'
              value={formData.promptDiplome}
              onChange={handleInputChange}
              placeholder='Diplôme'
              maxLength={100}
            />
            <Form.Control
              name='promptEntreprise'
              value={formData.promptEntreprise}
              onChange={handleInputChange}
              placeholder='Entreprise'
              maxLength={100}
            />
            <Form.Control
              name='promptPoste'
              value={formData.promptPoste}
              onChange={handleInputChange}
              placeholder='Poste'
              maxLength={100}
            />
            <Form.Control
              name='promptAnnonce'
              value={formData.promptAnnonce}
              onChange={handleInputChange}
              placeholder='Annonce'
              maxLength={500}
            />
          </Form.Group>
          <Button type='submit' className='mb-3' disabled={quoteLoading}>
            Créer ma lettre de motivation
          </Button>
        </Form>
        {quoteLoading && <Spinner animation='border' />}
        {quoteLoadingError && "Something went wrong. Please try again."}
        {quote && <h5>{quote}</h5>}
      </main>
    </>
  )
}
