import '../styles/globals.css'
import type { AppProps } from 'next/app'
import VotingState from "../context/voting/VotingState";

function MyApp({ Component, pageProps }: AppProps) {
  return (
		<VotingState>
			<Component {...pageProps} />
		</VotingState>
	);
}

export default MyApp
