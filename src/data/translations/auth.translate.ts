export interface AuthTranslations {
  login: {
    title: string
    subtitle: string
    form: {
      email: string
      emailPlaceholder: string
      password: string
      passwordPlaceholder: string
      rememberMe: string
      forgotPassword: string
      submit: string
      submitting: string
    }
    validation: {
      emailRequired: string
      emailInvalid: string
      passwordRequired: string
      passwordMinLength: string
    }
    errors: {
      loginFailed: string
    }
  }
  register: {
    title: string
    subtitle: string
    invitationNote: string
    sections: {
      personal: string
      professional: string
      links: string
      security: string
    }
    form: {
      firstNamePlaceholder: string | undefined
      lastNamePlaceholder: string | undefined
      emailPlaceholder: string | undefined
      roles: any
      passwordPlaceholder: string | undefined
      confirmPasswordPlaceholder: string | undefined
      firstName: string
      lastName: string
      email: string
      phone: string
      role: string
      selectRole: string
      researchDomain: string
      researchDomainPlaceholder: string
      biography: string
      biographyPlaceholder: string
      githubUrl: string
      linkedinUrl: string
      personalWebsite: string
      password: string
      confirmPassword: string
      submit: string
      submitting: string
    }
    roles: {
      professor: string
      phd: string
      master: string
    }
    validation: {
      firstNameRequired: string
      lastNameRequired: string
      emailRequired: string
      emailInvalid: string
      roleRequired: string
      passwordRequired: string
      passwordMinLength: string
      passwordMismatch: string
    }
    errors: {
      registrationFailed: string
    },
    successRegistrationMessage: string
  }
}

export const authTranslations = {
  en: {
    login: {
      title: 'Sign in to your account',
      subtitle: 'Access the STIL Lab platform',
      form: {
        email: 'Email address',
        emailPlaceholder: 'Enter your email',
        password: 'Password',
        passwordPlaceholder: 'Enter your password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot your password?',
        submit: 'Sign in',
        submitting: 'Signing in...'
      },
      validation: {
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 6 characters'
      },
      errors: {
        loginFailed: 'Invalid email or password. Please try again.'
      }
    },
    register: {
      title: 'Join STIL Lab',
      subtitle: 'Create your researcher profile',
      invitationNote: 'Registration is by invitation only. Please ensure you have received an invitation email.',
      sections: {
        personal: 'Personal Information',
        professional: 'Professional Information',
        links: 'External Links',
        security: 'Security'
      },
      form: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
        role: 'Role',
        selectRole: 'Select your role',
        researchDomain: 'Research Domain',
        researchDomainPlaceholder: 'e.g., Machine Learning, Software Engineering',
        biography: 'Biography',
        biographyPlaceholder: 'Tell us about your research interests and background...',
        githubUrl: 'GitHub URL',
        linkedinUrl: 'LinkedIn URL',
        personalWebsite: 'Personal Website',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        submit: 'Create Account',
        submitting: 'Creating account...'
      },
      roles: {
        professor: 'PRO',
        phd: 'PHD',
        master: 'MSC'
      },
      validation: {
        firstNameRequired: 'First name is required',
        lastNameRequired: 'Last name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        roleRequired: 'Please select a role',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 8 characters',
        passwordMismatch: 'Passwords do not match'
      },
      errors: {
        registrationFailed: 'Registration failed. Please try again.'
      },
      successRegistrationMessage: 'Registration successful! You can now log in with your new account.'
    }
  },
  fr: {
    login: {
      title: 'Connexion à votre compte',
      subtitle: 'Accédez à la plateforme du Laboratoire STIL',
      form: {
        email: 'Adresse email',
        emailPlaceholder: 'Entrez votre email',
        password: 'Mot de passe',
        passwordPlaceholder: 'Entrez votre mot de passe',
        rememberMe: 'Se souvenir de moi',
        forgotPassword: 'Mot de passe oublié ?',
        submit: 'Se connecter',
        submitting: 'Connexion...'
      },
      validation: {
        emailRequired: 'L\'email est requis',
        emailInvalid: 'Veuillez entrer une adresse email valide',
        passwordRequired: 'Le mot de passe est requis',
        passwordMinLength: 'Le mot de passe doit contenir au moins 6 caractères'
      },
      errors: {
        loginFailed: 'Email ou mot de passe invalide. Veuillez réessayer.'
      }
    },
    register: {
      title: 'Rejoindre le Laboratoire STIL',
      subtitle: 'Créez votre profil de chercheur',
      invitationNote: 'L\'inscription se fait uniquement sur invitation. Assurez-vous d\'avoir reçu un email d\'invitation.',
      sections: {
        personal: 'Informations personnelles',
        professional: 'Informations professionnelles',
        links: 'Liens externes',
        security: 'Sécurité'
      },
      form: {
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Adresse email',
        phone: 'Numéro de téléphone',
        role: 'Rôle',
        selectRole: 'Sélectionnez votre rôle',
        researchDomain: 'Domaine de recherche',
        researchDomainPlaceholder: 'ex. Apprentissage automatique, Génie logiciel',
        biography: 'Biographie',
        biographyPlaceholder: 'Parlez-nous de vos intérêts de recherche et votre parcours...',
        githubUrl: 'URL GitHub',
        linkedinUrl: 'URL LinkedIn',
        personalWebsite: 'Site web personnel',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        submit: 'Créer le compte',
        submitting: 'Création du compte...'
      },
      roles: {
        professor: 'PRO',
        phd: 'PHD',
        master: 'MSC'
      },
      validation: {
        firstNameRequired: 'Le prénom est requis',
        lastNameRequired: 'Le nom est requis',
        emailRequired: 'L\'email est requis',
        emailInvalid: 'Veuillez entrer une adresse email valide',
        roleRequired: 'Veuillez sélectionner un rôle',
        passwordRequired: 'Le mot de passe est requis',
        passwordMinLength: 'Le mot de passe doit contenir au moins 8 caractères',
        passwordMismatch: 'Les mots de passe ne correspondent pas'
      },
      errors: {
        registrationFailed: 'L\'inscription a échoué. Veuillez réessayer.'
      },
      successRegistrationMessage: 'Inscription réussie ! Vous pouvez maintenant vous connecter avec votre nouveau compte.'
    }
  }
} as const