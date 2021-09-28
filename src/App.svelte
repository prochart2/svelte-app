<script>
	import { auth } from "./firebase";
	import { signInWithPopup, GithubAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";


	import Report from './Report.svelte';

	export let name;
	let uid = null;

	const authProvider = new GithubAuthProvider();
	const onSignInSubmit = () => {
		signInWithPopup(auth, authProvider)
			.then(result => {
				console.dir(result);
				uid = result.user.uid;
				console.log("sign in success");
			})
			.catch((err) => {
				console.error(err.message);
			});
	}

	const onSignOutSubmit = () => {
		signOut(auth)
			.then(() => {
				console.log("sign out success");
			})
			.catch((err) => {
				console.log("sign out fail")
			});
	}

	onAuthStateChanged(auth, (user) => {
		if (user) {
			uid = user.uid;
		} else {
			uid = null;
		}
	});
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<p>Your User ID is {uid}</p>
	<input type="submit" on:click={onSignInSubmit} value="SigiIn">
	<input type="submit" on:click={onSignOutSubmit} value="SignOut">

	{#if uid}
		<Report uid={uid} />
	{/if}
	<!-- <FirebaseApp {firebase}> -->
	<!-- </FirebaseApp> -->
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
