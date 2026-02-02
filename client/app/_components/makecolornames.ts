import { colornames } from "color-name-list";

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

async function main() {
  const fb = new FileBuilder();
  fb.addLine(`export const colornames = {`);
  colornames.forEach((colorname) => {
    console.log(colorname.name);
    console.log(colorname.hex);
    fb.addLine(`"${colorname.hex}": "${colorname.name}",`, 1);
  });
  fb.addLine(`};`);
  const out = fb.build();
  await Bun.write("./app/_components/colornames.ts", out);
}

main();
