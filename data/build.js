import fs from "node:fs";
import path from "node:path";

const ROOT_PATH = "./";
const METADATA_FILENAME = "metadata.json";
const README_FILENAME = "README.md";

const OUTPUT_PATH = "../website/public/data";
const MENU_ENTRIES_FILENAME = "menu-entries.json";
const CONTENT_FILENAME = "content.json";

(() => {
  fs.rmSync(OUTPUT_PATH, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_PATH, { recursive: true });

  const rootDirContent = fs.readdirSync(ROOT_PATH);

  const menuEntries = [];

  for (const pageFolderSubPath of rootDirContent) {
    const pageFolderAbsPath = path.join(ROOT_PATH, pageFolderSubPath);
    const pageFolderRelPath = pageFolderSubPath;

    if (!fs.statSync(pageFolderAbsPath).isDirectory()) {
      continue;
    }

    const pageMetadataPath = path.join(pageFolderAbsPath, METADATA_FILENAME);

    if (!fs.existsSync(pageMetadataPath)) {
      continue;
    }

    const pageMetadata = JSON.parse(fs.readFileSync(pageMetadataPath));

    const menuEntry = {
      key: pageMetadata.key,
      path: pageMetadata.path,
      label: pageMetadata.title,
      type: pageMetadata.type,
    };

    menuEntries.push(menuEntry);

    if (pageMetadata.type === "article") {
      buildArticle(pageFolderRelPath, pageMetadata);
    } else if (pageMetadata.type === "category") {
      buildCategory(pageFolderRelPath, pageMetadata);
    }
  }

  const menuEntriesPath = path.join(OUTPUT_PATH, MENU_ENTRIES_FILENAME);

  fs.writeFileSync(menuEntriesPath, JSON.stringify(menuEntries), { encoding: "utf8" });
})();

function buildArticle(articleFolderRelPath, articleMetadata) {
  const articleFolderAbsPath = path.join(ROOT_PATH, articleFolderRelPath);

  const contentPath = path.join(articleFolderAbsPath, README_FILENAME);
  const content = fs.readFileSync(contentPath, { encoding: "utf8" });

  const articleInfo = {
    ...articleMetadata,
    content,
  };

  const articleOutputPath = path.join(OUTPUT_PATH, articleFolderRelPath);

  if (!fs.existsSync(articleOutputPath)) {
    fs.mkdirSync(articleOutputPath, { recursive: true });
  }

  const articleInfoPath = path.join(articleOutputPath, CONTENT_FILENAME);

  fs.writeFileSync(articleInfoPath, JSON.stringify(articleInfo));

  const articleFolderContent = fs.readdirSync(articleFolderAbsPath);
  for (const subPath of articleFolderContent) {
    if (subPath !== METADATA_FILENAME && subPath !== README_FILENAME) {
      const srcPath = path.join(articleFolderAbsPath, subPath);
      const destPath = path.join(articleOutputPath, subPath);
      fs.cpSync(srcPath, destPath, { recursive: true });
    }
  }
}

function buildCategory(categoryFolderRelPath, categoryMetadata) {
  const articles = [];

  const categoryFolderAbsPath = path.join(ROOT_PATH, categoryFolderRelPath);

  const categoryFolderContent = fs.readdirSync(categoryFolderAbsPath).sort((a, b) => b.localeCompare(a));
  for (const articleFolderSubPath of categoryFolderContent) {
    const articleFolderAbsPath = path.join(categoryFolderAbsPath, articleFolderSubPath);
    const articleFolderRelPath = path.join(categoryFolderRelPath, articleFolderSubPath);

    if (!fs.statSync(articleFolderAbsPath).isDirectory()) {
      continue;
    }

    const articleMetadataPath = path.join(articleFolderAbsPath, METADATA_FILENAME);

    if (!fs.existsSync(articleMetadataPath)) {
      continue;
    }

    const articleMetadata = JSON.parse(fs.readFileSync(articleMetadataPath, { encoding: "utf8" }));

    articles.push(articleMetadata);
    
    buildArticle(articleFolderRelPath, articleMetadata);
  }

  const categoryInfo = {
    ...categoryMetadata,
    articles,
  };

  const categoryOutputPath = path.join(OUTPUT_PATH, categoryFolderRelPath);

  if (!fs.existsSync(categoryOutputPath)) {
    fs.mkdirSync(categoryOutputPath, { recursive: true });
  }

  const categoryInfoPath = path.join(categoryOutputPath, CONTENT_FILENAME);

  fs.writeFileSync(categoryInfoPath, JSON.stringify(categoryInfo), { encoding: "utf8" });
}
