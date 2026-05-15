<script>
async function handleAuth() {
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passInput').value;
  const errorMsg = document.getElementById('error');

  if (!email || !password) {
    errorMsg.innerText = "Veuillez remplir tous les champs.";
    errorMsg.style.display = 'block';
    return;
  }

  errorMsg.style.display = 'none';

  if (isSignUpMode) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });

    if (error) {
      errorMsg.innerText = error.message;
      errorMsg.style.display = 'block';
      return;
    }

    alert("Compte créé ! Vous pouvez maintenant vous connecter.");
    toggleMode();
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    errorMsg.innerText = error.message;
    errorMsg.style.display = 'block';
    return;
  }

  loginSuccess();
}


if (data.session) {
  loginSuccess();
}
        }
    }
</script>
