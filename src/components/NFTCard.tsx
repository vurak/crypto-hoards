import { useCallback, useEffect, useState } from "react";

interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  tokenAuthority: string;
  supply: string | number;
  type: "nft";
}
interface TokenAccount {
  lamports: number;
  ownerProgram: string;
  type: "token_account";
  rentEpoch: number;
  account: string;
  tokenInfo: TokenInfo;
  metadata?: any;
  onchainMetadata?: any;
}

interface PropTypes {
  mint: string;
}

export const NFTCard = ({ mint }: PropTypes) => {
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState<TokenAccount | null>(null);

  const getNFTData = useCallback(() => {
    return fetch(`https://public-api.solscan.io/account/${mint}`).then((res) =>
      res.json()
    );
  }, [mint]);

  useEffect(() => {
    setLoaded(false);
    getNFTData().then((tokenAccount: TokenAccount) => {
      setToken(tokenAccount);
      setLoaded(true);
    });
  }, []);

  return token ? (
    <div className="bg-primary-light mb-4 rounded-lg text-white" key={mint}>
      <img
        src={token.metadata.data.image}
        className="w-full rounded-t-lg"
      ></img>
      <div className="p-2">{token.metadata.data.name}</div>
    </div>
  ) : null;
};