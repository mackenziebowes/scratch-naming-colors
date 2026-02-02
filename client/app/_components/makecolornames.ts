import { colornames as all, type ColorName } from "color-name-list";
import { colornames as bestof } from "color-name-list/bestof";
import { colornames as short } from "color-name-list/short";

export function line(content: string, depth: number): string {
  return `\n${"\t".repeat(depth)}${content}`;
}

export class FileBuilder {
  private lines: string[] = [];

  addLine(content: string, depth: number = 0): void {
    this.lines.push(`${"\t".repeat(depth)}${content}`);
  }

  addEmptyLine(): void {
    this.lines.push("");
  }

  build(): string {
    return this.lines.join("\n");
  }
}

const makeRecord = async (set: ColorName[], name: string) => {
  const fb = new FileBuilder();
  fb.addLine(`export const colornames: Record<string, string> = {`);
  set.forEach((colorname) => {
    console.log(colorname.name);
    console.log(colorname.hex);
    fb.addLine(`"${colorname.hex}": "${colorname.name}",`, 1);
  });
  fb.addLine(`};`);
  const out = fb.build();
  await Bun.write(`./app/_components/${name}.ts`, out);
};

async function main() {
  await makeRecord(all, "allcolors");
  await makeRecord(bestof, "bestof");
  await makeRecord(short, "short");
}

main();
