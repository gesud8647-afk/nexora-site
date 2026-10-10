# NEXORA — Vercel deployment edition

A standalone responsive Next.js app using the owner's original NEXORA logo.
**Mainnet wallet balance is read-only. Mainnet staking is not enabled.**

## Local verification

Install Node.js 20.9+ (prefer supported LTS). In the extracted project folder:

```powershell
npm install
npm run build
npm run dev
```

Open http://localhost:3000. Do not upload `.env.local`, `node_modules`, or `.next` to GitHub.

## Deploy using GitHub + Vercel

1. Create a **private** GitHub repository, e.g. `nexora-site`.
2. Upload the **contents** of this project folder to the repository root (including `package.json`, `app/`, `public/`). Do **not** upload the outer ZIP as a single file.
3. Sign in to https://vercel.com and select **Add New > Project > Import Git Repository**. Grant GitHub access to the repository.
4. Framework preset: **Next.js**; Root Directory: `./` if files are at repository root. Leave Build Command at default (`next build`).
5. Under **Environment Variables**, optionally add:
   - `MAINNET_RPC_URL` = a trusted Solana Mainnet HTTPS RPC endpoint
   - `DEVNET_RPC_URL` = `https://api.devnet.solana.com` or a trusted Devnet endpoint
   These are server-only. **Never paste wallet private keys, seed phrases, or secret RPC keys in the repository or browser-side variables.**
6. Click **Deploy**. Vercel gives an HTTPS URL such as `your-project.vercel.app`.
7. Test on desktop and phone, preferably opening the HTTPS URL in the Phantom in-app browser. Connect only a wallet you control. Confirm that the token balance corresponds to the selected wallet. If changing accounts doesn't refresh, disconnect/reconnect.
8. Optionally set a custom domain in Vercel **Settings > Domains**, then register the domain with Google Search Console and submit its sitemap once one is configured for that domain. Google indexing is not guaranteed.

Vercel hosts the Next.js app; **your PC can be turned off**. Each GitHub push to the connected production branch triggers a new deployment.

## Security and limitations

- Official NEXORA Mainnet mint: `2B9pEieRCLttMai1FzaQuFEYcWfWki8TgLohEfR1pump`.
- Solana staking program is **Devnet-only**, unaudited, and uses a different test mint. No rewards/APY are implemented.
- Wallet connection only requests the public address. The UI does not send signing, staking or transfer transactions.
- The public Solana RPC endpoints are rate-limited. Production traffic should use a private server-side RPC key, configure rate limiting and monitor usage/cost.
- `/api/dashboard?wallet=...` is a public API and should be protected with rate limiting or abuse controls before significant traffic.
- A publicly available crypto business must use hosting terms compatible with commercial use. Vercel Hobby is not intended for commercial production.
- Add privacy policy, verified official links, accessibility and security review before public launch.
- **Never claim Mainnet staking is available until audited and deployed.**

## Vercel update (mobile Phantom)
- The DEVNET TESTING navigation badge was removed; Devnet staking remains clearly identified as a test in the staking section.
- Mainnet token link opens the provided Pump.fun URL.
- On HTTPS mobile, use Open in Phantom Mobile to launch the Phantom in-app browser. Connect requests wallet authorization; Verify wallet requests an OPTIONAL off-chain message signature. No funds move and no server-side authentication is implied.
- Mobile wallet behavior depends on Phantom app/version; verify on a real device.
