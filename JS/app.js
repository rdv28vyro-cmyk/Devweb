const SUPABASE_URL = "https://slfvidffqautcfklxgya.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_nNinSqNHFfbCwN6qflsLrA_BIH-sqcw";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let isSignUpMode = false;

const loginOverlay = document.getElementById("loginOverlay");
const mainContent = document.getElementById("mainContent");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const toggleText = document.getElementById("toggleText");
const errorMsg = document.getElementById("error");
const emailInput = document.getElementById("emailInput");
const passInput = document.getElementById("passInput");
const logoutBtn = document.getElementById("logoutBtn");

function toggleMode() {
  isSignUpMode = !isSignUpMode;
  errorMsg.style.display = "none";

  if (isSignUpMode) {
    formTitle.innerText = "S'inscrire";
    submitBtn.innerText = "Créer mon compte";
    toggleText.innerText = "Déjà un compte ? Se connecter";
  } else {
    formTitle.innerText = "Se connecter";
    submitBtn.innerText = "Se connecter";
    toggleText.innerText = "Pas de compte ? S'inscrire";
  }
}

async function handleAuth() {
  const email = emailInput.value.trim();
  const password = passInput.value.trim();

  errorMsg.style.display = "none";

  if (!email || !password) {
    errorMsg.innerText = "Veuillez remplir tous les champs.";
    errorMsg.style.display = "block";
    return;
  }

  if (isSignUpMode) {
    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      errorMsg.innerText = "Erreur d'inscription : " + error.message;
      errorMsg.style.display = "block";
      return;
    }

    alert("Compte créé ! Vérifiez vos e-mails si la confirmation est activée.");
    toggleMode();
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    errorMsg.innerText = "Erreur : " + error.message;
    errorMsg.style.display = "block";
    return;
  }

  if (data?.session) {
    loginSuccess();
  }
}

function loginSuccess() {
  loginOverlay.style.display = "none";
  mainContent.style.display = "block";
  localStorage.setItem("isLoggedIn", "true");
}

async function logout() {
  await supabase.auth.signOut();
  localStorage.removeItem("isLoggedIn");
  location.reload();
}

submitBtn.addEventListener("click", handleAuth);
toggleText.addEventListener("click", toggleMode);
logoutBtn.addEventListener("click", logout);

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    loginSuccess();
  }
});
