import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const MINT = new PublicKey('2B9pEieRCLttMai1FzaQuFEYcWfWki8TgLohEfR1pump');
const TEST_MINT = new PublicKey('GQnggue4fNtEjhvjAj8MJpWZMGu3D8B9XRYHKrNMY3AH');
const PROGRAM = new PublicKey('67U7sBm1LDQFmzrrLMY2w263jx6YoekufisnJryqfwat');
const PLAYGROUND = new PublicKey('768fMPVceUm25nH95Nt6vSHhUt4J4NE8doLPq8MriQnQ');
export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('wallet') || '';
  let wallet: PublicKey;
  try { wallet = new PublicKey(address); if (!PublicKey.isOnCurve(wallet.toBytes())) throw Error('invalid'); }
  catch { return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 }); }
  try {
    const mainnet = new Connection(process.env.MAINNET_RPC_URL || 'https://api.mainnet-beta.solana.com', 'confirmed');
    const accounts = await mainnet.getParsedTokenAccountsByOwner(wallet, { mint: MINT });
    let balance = 0;
    for (const a of accounts.value) balance += Number(a.account.data.parsed.info.tokenAmount.uiAmount || 0);
    const response: Record<string, unknown> = { wallet: wallet.toBase58(), tokenBalance: balance, network: 'mainnet-beta', stakingEnabled: false };
    if (wallet.equals(PLAYGROUND)) {
      const devnet = new Connection(process.env.DEVNET_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
      const [stake] = PublicKey.findProgramAddressSync([Buffer.from('stake'), wallet.toBuffer(), TEST_MINT.toBuffer()], PROGRAM);
      const [vault] = PublicKey.findProgramAddressSync([Buffer.from('vault'), wallet.toBuffer(), TEST_MINT.toBuffer()], PROGRAM);
      const [info, vaultBalance] = await Promise.all([devnet.getAccountInfo(stake), devnet.getTokenAccountBalance(vault).catch(() => null)]);
      if (info && info.owner.equals(PROGRAM) && info.data.length >= 89) {
        const amount = info.data.readBigUInt64LE(72).toString();
        const unlock = Number(info.data.readBigInt64LE(80));
        response.devnet = { amount, vaultAmount: vaultBalance?.value.amount ?? null, unlockTime: unlock > 0 ? new Date(unlock * 1000).toISOString() : null, owner: PLAYGROUND.toBase58() };
      }
    }
    return NextResponse.json(response, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) { return NextResponse.json({ error: 'RPC unavailable or rate-limited. Configure MAINNET_RPC_URL in .env.local.' }, { status: 503 }); }
}
