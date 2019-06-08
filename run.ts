import { spawn, ChildProcess } from 'child_process'

const cp: ChildProcess[] = []
WebServer: {
  
  const bat = spawn('start', ['cmd.exe', '/c', 'server.bat'], {
    shell: true,
    windowsHide: false,
    detached: true
  });
      bat.stderr.on('data', (data) => {
        console.log(data.toString());
      });
      
      bat.stdout.on('data', (data) => {
        console.log(data.toString());
      });
      
  bat.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });
  cp.push(bat)
}
Controller: {

  const ctrl = spawn('start', ['cmd.exe', '/c', 'controller.bat'], {
    shell: true, 
    windowsHide: false,
    detached: true
  });
  ctrl.stderr.on('data', (data) => {
    console.log(data.toString());
  });
  
  ctrl.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });  
  cp.push(ctrl)
}
MockDevice: {
  const mock = spawn('start', ['cmd.exe', '/c', 'mock.bat'], {
    shell: true, 
    windowsHide: false,
    detached: true

  });
  mock.stderr.on('data', (data) => {
    console.log(data.toString())
  })
  mock.on('exit', (code) => {
    
    console.log(`Child exited with code ${code}`);
  })
  cp.push(mock)
}
function TestSuite(){

  const test = spawn('start', ['cmd.exe', '/c', 'test.bat'], {
    shell: true, 
    windowsHide: false,
    detached: true
  });
  test.stderr.on('data', (data) => {
    console.log(data.toString())
  })
  test.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  })
  cp.push(test)
}


process.stdin.on('data', (data) => {

  if(/^exit/.test(data)){

    spawn("start", ["cmd.exe","/c","exit.bat"],{
      windowsHide: false,
      shell: true,
      detached: true,
    }).on('error', (err) => {

      console.log("err", err)
    }).on('exit', (code) => {

      console.log("code", code)
      process.exit();
    }).on('data', (data) => {

      console.log("data", data)
    })
  }
  if(/^test/.test(data)){

    spawn("cmd.exe", ["kill", "/c", "taskkill /FI", '"WINDOWTITLE eq WaterGate - Test*"', "/f", "/t"], {
      shell: true,
      windowsHide: false,
      detached: true
    }).on('error', (err) => {

      console.log("err", err)
    }).on('data', (data) => {

      console.log("data", data)
    })
    .on("close", ()=>{

      TestSuite()
    })
  }
})
process.stdin.resume();
