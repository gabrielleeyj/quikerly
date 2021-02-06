import firebase from "firebase/app";
import "firebase/auth";

<FirebaseAuthProvider firebase={firebase} {...config}>
  {
    // my app code
  }
</FirebaseAuthProvider>

<FirebaseAuthConsumer>
  {({ isSignedIn, user, providerId }) => {
    return (
      <pre style={{ height: 300, overflow: "auto" }}>
        {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
      </pre>
    );
  }}
</FirebaseAuthConsumer>

<IfFirebaseAuthedAnd
  filter={({ providerId, user }) => {
    if(!user.email){return false;}
    return (
      providerId !== "anonymous" &&
      user.email.indexOf("@companyname.com") > -1
    );
  }}
  >
 {({ isSignedIn, user, providerId }) => {
   return (
   //some jsx code
   );
 }}
</IfFirebaseAuthedAnd>
