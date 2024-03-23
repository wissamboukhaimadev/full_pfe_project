export const checkToastShow = (state: boolean[]) => {
    for (let i = 0; i < state.length; i++) {
        if (state[i] === false) return false
    }
    return true
}