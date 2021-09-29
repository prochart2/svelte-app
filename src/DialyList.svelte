<script>
    import { Link } from "svelte-routing";
    import { db } from './firebase';
    import { doc, getDocs, collection} from "firebase/firestore";

    export let uid;

    let dates = [];

    let userRef = doc(db, 'users', uid);
    let dialiesRef = collection(userRef, 'dialy');
    getDocs(dialiesRef)
    .then(snap => {
        dates = snap.docs.map(doc => doc.id);
    });

</script>

<p>
    {#each dates as date , idx }
        <Link to="/dialy/{date}">{date}</Link><br>
    {/each}
</p>
<Link to="/dialy/new">今日の日報を付ける</Link><br>
