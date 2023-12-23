

export const log = {
    debug: (msg: string) => {
        // console.log(msg)
    },
    info: (msg: string) => console.log(msg),
    error: (err: Error) => console.error(err),
}

export default log