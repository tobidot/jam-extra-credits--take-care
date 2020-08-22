import { Shared } from "../shared/Shared";
import p5 from "p5";

export function load_game() {
    let innerContainer = document.createElement('div');
    let p5Instance = new p5(setup_p5_instance, innerContainer);
    connect_container_to_game_screen(innerContainer, p5Instance);
}

function connect_container_to_game_screen(container: HTMLDivElement, p5Instance: p5) {
    let shared = Shared.get_instance();
    shared.game_screen_container.add((signal) => {
        let canvas = (<any>p5Instance).canvas as HTMLCanvasElement;
        if (signal.new === null) {
            canvas.style.visibility = "hidden";
            signal.old.removeChild(container);
        } else {
            signal.new.append(container);
            canvas.style.visibility = "visible";
            canvas.style.width = "100%";
            canvas.style.height = "auto";
        }
    });
}

function setup_p5_instance(p: p5) {
    p.setup = function () {
        // where does this canvas come from=?
        (<any>p).canvas.remove();
        p.createCanvas(800, 600, "webgl");
    }
    let rot = 0;
    p.draw = function () {
        p.background(0);
        p.rotateX(rot);
        p.rotateY(rot * 2);
        p.rect(10, 10, 50, 50);
        p.fill('purple');
        p.box(20);
        rot += 0.1;
    }
}