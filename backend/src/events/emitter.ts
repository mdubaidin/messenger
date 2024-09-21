const Events = ['Alert', 'Notification', 'New Message'] as const;

type Event = (typeof Events)[number];

type EmitEvent = (event: Event) => void;

const emitEvent: EmitEvent = event => {
    console.log('Emitting event... ', event);
};

export { emitEvent };
