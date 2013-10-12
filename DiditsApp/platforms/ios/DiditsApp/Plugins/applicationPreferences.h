#import <Foundation/Foundation.h>

#import <Cordova/CDVPlugin.h>

@interface applicationPreferences : CDVPlugin
{
    
}

-   (void) getSetting:(CDVInvokedUrlCommand*)command;
-   (void) setSetting:(CDVInvokedUrlCommand*)command;
-   (NSString*) getSettingFromBundle:(NSString*)settingName;


@end