// ----------------------------------------
// コマンドインターフェース
// ----------------------------------------
interface Command {
    execute(): void;
    undo(): void;
}

// ----------------------------------------
// 家電製品のクラス
// ----------------------------------------
class Light {
    on(): void {
        console.log("照明が点きました");
    }

    off(): void {
        console.log("照明が消えました");
    }
}

class TV {
    on(): void {
        console.log("テレビが点きました");
    }

    off(): void {
        console.log("テレビが消えました");
    }
}

class AirConditioner {
    on(): void {
        console.log("エアコンが点きました");
    }

    off(): void {
        console.log("エアコンが消えました");
    }
}

// ----------------------------------------
// コマンドクラス
// ----------------------------------------

// 全てCommandインターフェースを満たしている

// ライトをつけるコマンドに対するundoは「ライトを消す」
class LightOnCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute(): void {
        this.light.on();
    }

    undo(): void {
        this.light.off();
    }
}

// ライトを消すコマンドに対するundoは「ライトをつける」
class LightOffCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute(): void {
        this.light.off();
    }

    undo(): void {
        this.light.on();
    }
}

class TVOnCommand implements Command {
    private tv: TV;

    constructor(tv: TV) {
        this.tv = tv;
    }

    execute(): void {
        this.tv.on();
    }

    undo(): void {
        this.tv.off();
    }
}

class TVOffCommand implements Command {
    private tv: TV;

    constructor(tv: TV) {
        this.tv = tv;
    }

    execute(): void {
        this.tv.off();
    }

    undo(): void {
        this.tv.on();
    }
}

class AirConditionerOnCommand implements Command {
    private airConditioner: AirConditioner;

    constructor(airConditioner: AirConditioner) {
        this.airConditioner = airConditioner;
    }

    execute(): void {
        this.airConditioner.on();
    }

    undo(): void {
        this.airConditioner.off();
    }
}

class AirConditionerOffCommand implements Command {
    private airConditioner: AirConditioner;

    constructor(airConditioner: AirConditioner) {
        this.airConditioner = airConditioner;
    }

    execute(): void {
        this.airConditioner.off();
    }

    undo(): void {
        this.airConditioner.on();
    }
}

// ----------------------------------------
// リモコンクラス
// ----------------------------------------

// コマンドインターフェースを満たしてさえいればこのRemoteControlでコマンドを呼び脱せる
// →つまり他の家電を追加したとしても拡張しやすい
// このリモコンクラスは「最後に行った操作を記憶する」オブジェクト
// このリモコンクラスでexecuteCommandでラップした「LightOnCommand(light)」をすると
// ライトがonになると同時に、最後の操作が「ライトをonにした操作」としてこのオブジェクトに記憶される
// なのでundoをすると「ライトを消す」操作となる

class RemoteControl {
    private commandHistory: Command[] = [];

    executeCommand(command: Command): void {
        command.execute();
        this.commandHistory.push(command);
    }

    // もし最後の操作が照明ならlightオブジェクトのundoが呼び出され、
    // もし最後の操作がTVならtvオブジェクトのundoが呼び出される
    // 最後の操作がどのオブジェクトに対してのものかを「this.commandHistory.pop()」によって特定している
    undoCommand(): void {
        const command = this.commandHistory.pop();
        if (command) {
            command.undo();
        } else {
            console.log("アンドゥできる操作がありません");
        }
    }
}

// ----------------------------------------
// 呼び出し
// ----------------------------------------

const light = new Light();
const tv = new TV();
const airConditioner = new AirConditioner();

const lightOn = new LightOnCommand(light);
const lightOff = new LightOffCommand(light);
const tvOn = new TVOnCommand(tv);
const tvOff = new TVOffCommand(tv);
const airConditionerOn = new AirConditionerOnCommand(airConditioner);
const airConditionerOff = new AirConditionerOffCommand(airConditioner);

const remoteControl = new RemoteControl();

// 照明をつける
remoteControl.executeCommand(lightOn);
// テレビをつける
remoteControl.executeCommand(tvOn);
// エアコンをつける
remoteControl.executeCommand(airConditionerOn);

// lightOnもtvonもairConditionerOnもどれもCommandインターフェースを守っているので
// つまりはexecuteもundoも備わっているので引数として入れることができる

// 照明を消す
remoteControl.executeCommand(lightOff);

// 最後の操作（照明を消す）をアンドゥする（照明を再びつける）
remoteControl.undoCommand();
