

import * as fs from 'fs';
import * as path from 'path';
import * as fsExtra from 'fs-extra';
import * as extract from 'extract-zip';

/**
 * 删除文件或目录，如果文件不存在返回 false，成功删除返回 true
 */
export function remove(file: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    fs.access(file, fs.constants.R_OK | fs.constants.W_OK, (err0) => {
      if (err0) {
        return resolve(false);
      }
      fsExtra.remove(file, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      });
    });
  });
}

/**
 * 读取文件内容
 */
export function readFile(file: string): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

/**
 * 写入文件，如果父目录不存在会自动创建
 */
export function writeFile(file: string, data: Buffer | string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fsExtra.ensureDir(path.dirname(file), (err) => {
      if (err) {
        return reject(err);
      }
      fs.writeFile(file, data, (err2) => {
        if (err2) {
          return reject(err2);
        }
        resolve();
      });
    });
  });
}

/**
 * 检查文件是否存在
 */
export function exists(file: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access(file, fs.constants.R_OK | fs.constants.W_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * 解压ZIP文件
 */
export function extractZip(inputFile: string, outDir: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    extract(inputFile, {
      dir: outDir,
    }, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * 确保目录存在，如果不存在则自动创建
 */
export function ensureDir(dir: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fsExtra.ensureDir(dir, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * 确保文件存在，如果不存在则自动创建
 */
export function ensureFile(dir: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fsExtra.ensureFile(dir, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * 重命名(会先删除目标文件)
 */
export async function rename(oldPath: string, newPath: string): Promise<void> {
  await remove(newPath);
  return new Promise<void>((resolve, reject) => {
    fsExtra.move(oldPath, newPath, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * 读json文件，返回对象
 * @param file 文件路径
 */
export function readJSON(file: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fsExtra.readJSON(file, (err, json) => {
      if (err) {
        return reject(err);
      }
      resolve(json);
    });
  });
}

/**
 * 写json文件，可以自动创建文件夹
 * @param file 文件路径
 * @param object
 */
export function writeJSON(file: string, object: any): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fsExtra.outputJSON(file, object, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * 复制文件
 */
export function copy(src: string, dest: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fsExtra.copy(src, dest, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * 获取文件夹下的所有文件和文件夹路径（不包含'.'和'..'）
 * @param {String} dir 文件夹路径
 * @return {Promise.<String[]>} 路径数组（相对于dir参数的完整路径）
 */
export function readdir(dir: string): Promise<string[]> {
  return new Promise(function (resolve, reject) {
    fs.readdir(dir, function (err, files) {
      if (err) {
        return reject(err);
      }
      resolve(files.map(f => path.resolve(dir, f)));
    });
  });
}

/**
 * 判断是否是文件(如果不存在会抛出异常)
 * @param path 文件路径
 */
export function isFile(path: string) {
  return new Promise(function (resolve, reject) {
    fs.lstat(path, function (err, stat) {
      if (err) {
        return reject(err);
      }
      resolve(stat.isFile());
    });
  });
}

/**
 * 判断是否是文件夹(如果不存在会抛出异常)
 * @param path 文件路径
 */
export function isDirectory(path: string) {
  return new Promise(function (resolve, reject) {
    fs.lstat(path, function (err, stat) {
      if (err) {
        return reject(err);
      }
      resolve(stat.isDirectory());
    });
  });
}

