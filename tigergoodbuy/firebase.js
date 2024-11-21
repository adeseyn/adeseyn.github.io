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

export function publishPost(name, imageUrl, postDate, desc, price, userId)
{
    const postsRef = ref(db, "posts");
    
    // Generate a new unique key for the post
    const newPostRef = push(postsRef);
    const postId = newPostRef.key; // The generated unique key
  
    // Create the post data
    const postData = {
		id: postId,
		name: name,
		image: imageUrl,
		date: postDate,
		user: userId,
		desc: desc,
		price: price
    };
  
    // Check if the ID exists (this should rarely happen due to `push`)
    return get(child(postsRef, postId))
      .then(snapshot => {
        if (!snapshot.exists()) {
          // Write the post to the database
          return set(newPostRef, postData)
            .then(() => console.log("Post published successfully with ID:", postId))
            .catch(error => console.error("Error publishing post:", error));
        } else {
          console.error("Post ID collision detected. Please try again.");
          return null;
        }
      })
      .catch(error => console.error("Error checking post ID existence:", error));
}

export function getPostById(postId)
{
    const postRef = ref(db, `posts/${postId}`);
  
    return get(postRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log("Post data:", snapshot.val());
          return snapshot.val();
        } else {
          console.log("No post found with the given ID.");
          return null;
        }
      })
      .catch(error => console.error("Error fetching post:", error));
}

export function getRecentPosts(limit) {
    const postsRef = ref(db, "posts");
  
    // Query to order posts by date and limit the results to the most recent `limit` posts
    const recentPostsQuery = query(postsRef, orderByChild("date"), limitToLast(limit));
  
    return get(recentPostsQuery)
      .then(snapshot => {
        if (snapshot.exists()) {
          const posts = [];
          snapshot.forEach(childSnapshot => {
            posts.push(childSnapshot.val());
          });
          // Sort by date in descending order (most recent first)
          posts.sort((a, b) => new Date(b.date) - new Date(a.date));
          //console.log("Recent posts:", posts);
          return posts;
        } else {
          console.log("No posts found.");
          return [];
        }
      })
      .catch(error => console.error("Error fetching recent posts:", error));
}

export function createUser(username, password, displayName, profileImage) {
	const usersRef = ref(db, "users");

	// Generate a unique ID for the new user
	const newUserRef = push(usersRef);
	const userId = newUserRef.key;

	// Create the user data
	const userData = {
		id: userId,
		username: username,
		password: password, // In production, hash the password before storing it!
		displayName: displayName,
		profileImage: profileImage
	};

	// Save the user to the database
	return set(newUserRef, userData)
		.then(() => {
		console.log("User created successfully with ID:", userId);
		return userId;
		})
		.catch(error => console.error("Error creating user:", error));
}

export function getUserPosts(userId) {
	const postsRef = ref(db, "posts");

	// Query to fetch all posts by a specific user
	const userPostsQuery = query(postsRef, orderByChild("user"), equalTo(userId));

	return get(userPostsQuery)
	.then(snapshot => {
		if (snapshot.exists()) {
			const userPosts = [];
			snapshot.forEach(childSnapshot => {
			userPosts.push(childSnapshot.val());
			});
			console.log(`Posts by user ${userId}:`, userPosts);
			return userPosts;
		} else {
			console.log(`No posts found for user ${userId}.`);
			return [];
		}
	})
	.catch(error => console.error("Error fetching user posts:", error));
}