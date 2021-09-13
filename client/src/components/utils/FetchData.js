import axios from 'axios'

export const getData = async (url) => {
    const res = await axios.get(url)
    return res;
}

export const patchData = async (url, data) => {
    const res = await axios.patch(url, data)
    return res;
}

export const deleteComment = async(url) => {

    await axios.delete(url)
}

export const deleteReply = async(url, data) => {
    const res = await axios.put(url )
}
