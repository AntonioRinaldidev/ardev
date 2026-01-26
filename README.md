

### Architettura del Progetto

```mermaid
sequenceDiagram
    participant A as Client A (Mittente)
    participant S as Signaling & Push Server
    participant T as STUN/TURN Infrastructure
    participant B as Client B (Destinatario)

    Note over A: Auth Apple (iOS) / FlashCall (Android)
    A->>S: Invio Hash numeri Rubrica (Discovery)
    S-->>A: Lista contatti registrati (Match)
    
    A->>S: Inizializza Trasferimento (Metadata)
    S->>B: Push Notification (Wake-up)
    Note over B: App attivata in Background
    B->>S: Connessione WebSocket (Handshake)
    
    A<->T: Raccolta ICE Candidates (NAT discovery)
    B<->T: Raccolta ICE Candidates
    
    A->>S: SDP Offer (Parametri Criptati)
    S->>B: SDP Offer
    B->>S: SDP Answer
    S->>A: SDP Answer
    
    Note over A,B: Tunnel P2P DTLS/SCTP Stabilito
    A->>B: Trasferimento File Diretto (E2EE)
    Note over S: Nessun file archiviato (Zero-Knowledge)
```


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
