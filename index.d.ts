declare class JSZM {
    constructor(arr: ArrayLike<number>);

    /**
     * A generator function you define, which will be called to update the highlighting mode.
     * fixpitch (if the argument is true) or normal (if argument is false).
     */
    highlight(fixpitch: boolean): void;

    /** Normally false. Set it to true to tell the game that it is a Tandy computer; this affects some games. */
    isTandy: boolean;
  
    /**
     * A generator function that you must define that will be called to print text. You must implement
     * wrapping, buffering and scripting yourself. The second argument is true if it should be
     * copied to the transcript or false if it should not be.
     */
    print(text: string, scripting: boolean): void;

    /**
     * A generator function which you must define which should return a string containing the player's input.
     * Called when a READ instruction is executed.  The argument is the maximum number of characters that are
     * allowed (if you return a longer string, it will be truncated)
     */
    read(maxlen: number): void;

    /**
     * A generator function you can optionally define. When the game starts or if restarted (with the RESTART
     * instruction), it will be called after memory is initialized but before executing any more.
     */
    restarted(): void;

    /**
     * A generator function you define, which is called when restoring a saved game. Return a Uint8Array with
     * the same contents passed to save() if successful, or you can return false or null or undefined if it failed.
     */
    restore(): void;

    /**
     * A generator function. Call it to run the program from the beginning, and call the next() method of the
     * returned object to begin and to continue.  This generator may call your own generator functions which
     * may yield; it doesn't otherwise yield by itself.  You must set up the other methods before calling run
     * so that it can properly set up the contents of the Z-machine mode byte.
     * 
     * This generator only finishes when a QUIT instruction is executed.
     */
    run(): IterableIterator<any>;

    /**
     * A generator function you can define yourself, and is called when saving the game. The argument is a Uint8Array,
     * and you should attempt to save its contents somewhere, and then return true if successful or false if it failed.
     */
    save(buf: Uint8Array): void;

    /** The serial number of the story file, as six ASCII characters. */
    serial: string;

    /** 
     * Normally null. You can set it to a generator function which will be called when the SCREEN opcode is executed if
     * you want to implement split screen.
     */
    screen(window: number): void;

    /** 
     * Normally null. You can set it to a generator function which will be called when the SPLIT opcode is executed if
     * you want to implement split screen.
     */
    split(height: number): void;

    /**
     * False for score/moves and true for hours/minutes. Use this to determine the meaning of arguments to updateStatusLine.
     */
    statusType: boolean;

    /** 
     * Normally null, but can be a generator function if you are implementing the status line. It is called when a READ or
     * USL instruction is executed. See statusType for the meaning of v18 and v17. Return value is unused.
     */
    updateStatusLine(text: string, v18: number, v17: number): void;

    /** 
     * A normal function. Calling it will attempt to verify the story file, and returns true if successful or false on error.
     * You can override it with your own verification function if you want to.
     */
    verify(): void;

    /** The ZORKID of the story file. This is what is normally displayed as the release number. */
    zorkid: number;

    static version: {
        major: number;
        minor: number;
        subminor: number;
        timestamp: number;
    };
}

export = JSZM;