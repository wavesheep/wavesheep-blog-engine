import path from 'path';
import fs from 'fs';

import {
  parse
} from './postParser';

/**
 * assemble site data
 * 
 * auto run on render:before(nuxt lifecyle)
 */
function assemble() {
  // clear previous data
  // deleteFolderSync(path.join(__dirname, '../static'));
  // fs.mkdirSync(path.join(__dirname, '../static'));

  // copy data to static
  copyFolderSync(path.join(__dirname, '../data'), path.join(__dirname, '../static'));
}

/**
 * get post data
 * 
 */
function getData() {
  if (!global.__posts) {
    try {
      // __dirname doesn't work, so use process.cwd() to get project root dir
      const postDir = path.resolve(process.cwd(), 'data/post')
      const mds = fs.readdirSync(postDir);

      let posts = mds.map(mdPath => {
        const md = fs.readFileSync(path.resolve(postDir, mdPath));

        return parse(md.toString(), mdPath);
      })

      global.__posts = posts.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
    } catch (error) {
      console.error(error);
    }
  }

  return global.__posts;
}

// must be sync, aysnc is fast but can't know whether it is finished
function copyFolderSync(src, dist) {
  try {
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist)
    }
    const files = fs.readdirSync(src);
    files.forEach(file => {
      const filePath = path.resolve(src, file);
      if (fs.statSync(filePath).isFile()) {
        copyFileToFolder(filePath, dist);
      } else if (fs.statSync(filePath).isDirectory()) {
        copyFolderSync(filePath, path.resolve(dist, file));
      }
    })
  } catch (error) {
    console.error(error)
  }

  function copyFileToFolder(file, folder) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
    fs.writeFileSync(path.resolve(folder, path.basename(file)), fs.readFileSync(file));
  }
}

function deleteFolderSync(dir) {
  try {
    let files = fs.readdirSync(dir);
    files.forEach((file) => {
      let p = path.resolve(dir, file);
      let info = fs.statSync(p);
      if (info.isFile()) {
        fs.unlinkSync(p)
      } else if (info.isDirectory()) {
        deleteFolderSync(p)
      }
    })

    fs.rmdirSync(dir);
  } catch (error) {
    console.error(error);
  }
}

export {
  assemble,
  getData
};
