const postCommand = {
    name: "post",
    description: "post anonymously on a public channel",
    options: [
        {
            name: "message",
            description: "content of the message you want to post",
            type: 3,
            required: true
        }
    ]
}

module.exports = postCommand