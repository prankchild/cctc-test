// 写出 js 中几种常用循环的跳出本次循环和终止循环的方式；
// 1、for(for of for in都是如此)
for (let i = 0; i < 10; i++) {
  if (i === 1) {
    continue; // 跳出本次循环
  }
  if (i === 2) {
    break; // 终止循环 return也会终止循环
  }
}
// 2、while
let i = 0;
while (i < 10) {
  i++;
  if (i === 1) {
    continue; // 跳出本次循环
  }
  if (i === 2) {
    break; // 终止循环 return也会终止循环
  }
}
// 3、do while
let j = 0;
do {
  j++;
  if (j === 1) {
    continue; // 跳出本次循环
  }
  if (j === 2) {
    break; // 终止循环
  }
} while (j < 10);

// 4、forEach
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

try {
  arr.forEach((item: number) => {
    if (item === 1) {
      return; // 跳出本次循环
    }
    if (item === 2) {
      throw new Error("终止循环"); // 终止循环
    }
  });
} catch (error) {
  console.log(error);
}
// 一个循环体中，如何等待每步循环逻辑执行完毕后，再执行下一步；
function delay(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
async function forLoop() {
  for (let i = 0; i < 10; i++) {
    await delay(1000); // 等待1秒
    console.log(i);
  }
}
