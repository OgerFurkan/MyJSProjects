document.addEventListener("DOMContentLoaded", function() {
    const signUp= document.getElementById("sign-up");
    const signIn= document.getElementById("sign-in");
    const signUpDiv= document.querySelector(".sign-up-div");
    const signInDiv= document.querySelector(".sign-in-div");
    const blocker= document.querySelector(".blocker");
    const login= document.querySelector("#login");

    function run() {
        signUp.addEventListener("click", whileSignUp);
        signIn.addEventListener("click", whileSignIn);
        login.style.color = "black";
    }
    whileSignIn();
    run();


    function whileSignIn() {
        signInDiv.style.display = "none";
        signUpDiv.style.display = "flex";
        blocker.style.borderTopRightRadius = "5px";
        blocker.style.borderBottomRightRadius = "5px";
        blocker.style.borderBottomLeftRadius = "0px";
        blocker.style.borderTopLeftRadius = "0px";
        blocker.style.transform = "translateX(-60%)";
    }

    function whileSignUp() {
        signInDiv.style.display = "flex";
        signUpDiv.style.display = "none";
        blocker.style.borderTopLeftRadius = "5px";
        blocker.style.borderBottomLeftRadius = "5px";
        blocker.style.borderBottomRightRadius = "0px";
        blocker.style.borderTopRightRadius = "0px";
        blocker.style.transform = "translateX(-160%)";
    }
   
});
