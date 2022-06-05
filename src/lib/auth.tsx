import {
    signIn,
    getUser,
    LoginResponse,
    LoginCredentialsDTO
} from '../pages/auth';
import storage from '../services/utils/storage'

async function handleLoginResponse(data: LoginResponse) {
    const { access_token } = data
    storage.setToken(access_token)
    return access_token
}

async function loadUser() {
    return await getUser()
}

async function login(data: LoginCredentialsDTO) {
    const response = await signIn(data)
    return await handleLoginResponse(response)
}

async function logout() {
    storage.clearToken()
    window.location.assign(window.location.origin as unknown as string)
}

export { login, loadUser, logout }
