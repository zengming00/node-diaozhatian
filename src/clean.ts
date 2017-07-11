/*---------------------------------------------------------------------------------------------
 * miaoshe-renderer
 *--------------------------------------------------------------------------------------------*/

import * as fs from 'fs';
import * as path from 'path';
import * as gfs from './fs';

/**
 * 清理旧文件
 */
export default async function clean(dir: string, fileMaxAge: number) {
  const timestamp = Date.now() - fileMaxAge;
  const names = await readdir(dir);
  for (const name of names) {
    const file = path.resolve(dir, name);
    const stats = await fileStat(file);
    if (stats.ctime.getTime() < timestamp) {
      await gfs.remove(file);
    }
  }
}

/**
 * 读取下的目录文件
 */
function readdir(dir: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, ret) => {
      if (err) {
        return reject(err);
      }
      resolve(ret);
    });
  });
}

/**
 * 读取文件状态信息
 */
function fileStat(file: string | Buffer): Promise<fs.Stats> {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (err) {
        return reject(err);
      }
      resolve(stats);
    });
  });
}
