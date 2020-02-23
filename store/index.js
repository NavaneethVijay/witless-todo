import netlifyIdentity from 'netlify-identity-widget'

export const actions = {
  nuxtClientInit({ dispatch }) {
    if (netlifyIdentity.currentUser()) {
      const user = netlifyIdentity.currentUser()
      let currentUser = {
        username: user.user_metadata.full_name,
        image: user.user_metadata.avatar_url,
        email: user.email,
        access_token: user.token.access_token,
        expires_at: user.token.expires_at,
        refresh_token: user.token.refresh_token,
        token_type: user.token.token_type
      }
      dispatch('user/updateUser', {
        currentUser: currentUser
      })
    }
  }
}
