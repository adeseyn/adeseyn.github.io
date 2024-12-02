// functions to do with the posts database

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, get, push, child, query, orderByChild, equalTo, limitToLast } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig =
{
	apiKey: "AIzaSyBhZQPPCO8vvmalIlvDi1Og6FoBx6jSWxY",
    authDomain: "tigergoodbuy.firebaseapp.com",
    projectId: "tigergoodbuy",
    storageBucket: "tigergoodbuy.firebasestorage.app",
    messagingSenderId: "252210919624",
    appId: "1:252210919624:web:c4b11ef01d1517df7ecdfd",
    measurementId: "G-QEK1G58H9L"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// publish a post to the database
export function publishPost(name, imageUrl, postDate, desc, price, userId, city = "")
{
    const postsRef = ref(db, "posts");
    
    // generate a new unique key for the post
    const newPostRef = push(postsRef);
    const postId = newPostRef.key;
  
    const postData =
	{
		id: postId,
		name: name,
		image: imageUrl,
		date: postDate,
		user: userId,
		desc: desc,
		price: price,
		city: city
    };
  
    // check if the id exists
    return get(child(postsRef, postId))
	.then(snapshot =>
	{
		if (!snapshot.exists())
		{
			return set(newPostRef, postData)
			.then(() => console.log("Post published successfully with ID:", postId))
			.catch(error => console.error("Error publishing post:", error));
		}
		else
		{
			console.error("Post ID collision detected. Please try again.");
			return null;
		}
	})
	.catch(error => console.error("Error checking post ID existence:", error));
}

// gets a single post by its id
export function getPostById(postId)
{
    const postRef = ref(db, "posts/" + postId);
  
    return get(postRef)
	.then(snapshot =>
	{
		if (snapshot.exists())
		{
			return snapshot.val();
		}
		else
		{
			console.error("No post found with the given ID.");
			return null;
		}
	})
	.catch(error => console.error("Error fetching post:", error));
}

// gets the newest posts from the database
export function getRecentPosts(limit)
{
    const postsRef = ref(db, "posts");

    const recentPostsQuery = query(postsRef, orderByChild("date"), limitToLast(limit));
  
    return get(recentPostsQuery)
	.then(snapshot =>
	{
		if (snapshot.exists())
		{
			const posts = [];
			snapshot.forEach(childSnapshot =>
			{
				posts.push(childSnapshot.val());
			});

			// sort by date
			posts.sort((a, b) => new Date(b.date) - new Date(a.date));
			return posts;
		}
		else
		{
			console.log("No posts found.");
			return [];
		}
	})
	.catch(error => console.error("Error fetching recent posts:", error));
}

// search for a post by name and description
// supports fuzzy searching
export async function searchPosts(query, marginOfError = 0.4)
{
    const postsRef = ref(db, "posts");
  
    // Fetch all posts from the database
    try
	{
        const snapshot = await get(postsRef);
        if (!snapshot.exists())
        {
            console.log("No posts found.");
            return [];
        }

        const posts = [];
        snapshot.forEach(childSnapshot =>
		{
            posts.push(childSnapshot.val());
        });

		// configure fuzzy search
        const fuse = new Fuse(posts, {
            keys: ["name", "description"],
            threshold: marginOfError
        });

        const results = fuse.search(query);
        return results.map(result => result.item);
    }
	catch (error)
	{
        console.error("Error searching posts:", error);
        return [];
    }
}

// gets a number of random posts from the database
export async function getRandomPosts(count)
{
	const postsRef = ref(db, "posts");

	try
	{
		const snapshot = await get(postsRef);
		if (!snapshot.exists())
		{
			console.log("No posts found.");
			return [];
		}

		const allPosts = [];
		snapshot.forEach(childSnapshot =>
		{
			allPosts.push(childSnapshot.val());
		});

		const shuffledPosts = allPosts.sort(() => Math.random() - 0.5);
		return shuffledPosts.slice(0, count);
	}
	catch (error)
	{
		console.error("Error fetching random posts:", error);
		return [];
	}
}