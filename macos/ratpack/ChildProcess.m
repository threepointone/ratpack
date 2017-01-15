#import "ChildProcess.h"
#import "RCTBridge.h"

@implementation RCTChildProcess

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(exec:(NSString *)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSDictionary *environmentDict = [[NSProcessInfo processInfo] environment];
  NSString *shellString = [environmentDict objectForKey:@"SHELL"];
  
  NSTask *task = [[NSTask alloc] init];
  NSPipe *pipe = [NSPipe pipe];
  NSFileHandle *file = pipe.fileHandleForReading;
  [task setLaunchPath:shellString];
  [task setArguments:@[ @"-l", @"-c", path ]];
  task.standardOutput = pipe;
  [task launch];
  NSData *data = [file readDataToEndOfFile];
  [file closeFile];

  NSString *output = [[NSString alloc] initWithData: data encoding: NSUTF8StringEncoding];
  resolve(output);
}

@end
