export type Author = {
    id: string,
    username: string,
    avatar: string,
    discriminator: string,
    bot: boolean,
};

export type Attachment = {
    id: string,
    url: string,
    proxy_url: string,
    filename: string,
    width: number,
    height: number,
    size: number,
};

export type Embed = {
    type: string,
    url?: string,
    title?: string,
    description?: string,
    color?: number,
};

export type Quote = {
    channel_id: string,
    content: string,
    timestamp: string,
    author: Author,
    attachments: Attachment[],
    embeds: Embed[],
    id?: any
};
