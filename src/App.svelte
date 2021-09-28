<script>
	import { auth } from "./firebase";
	import { signInWithPopup, GithubAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
	import { Router, Route } from "svelte-routing";
	import DialyList from "./DialyList.svelte";
	import Report from './Report.svelte';

	export let name;
	let uid = null;
    const today = new Date();

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

<Router>
	<main>
		<h1>Hello {name}!</h1>
		<p>Your User ID is {uid}</p>
		<input type="submit" on:click={onSignInSubmit} value="SigiIn">
		<input type="submit" on:click={onSignOutSubmit} value="SignOut">

		{#if uid}
		<Route path="">
			<DialyList uid={uid} />
		</Route>
		<Route path="dialy/:date" let:params>
			<Report uid={uid} date_str={params.date} />
		</Route>
		{/if}
		<!-- <FirebaseApp {firebase}> -->
			<!-- </FirebaseApp> -->
	</main>
</Router>

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
