//
//  PhonegapIToast.m
//  testNotification
//
//  Created by Zanis on 11/7/12.
//
//

#import "PhonegapIToast.h"
#import "iToast.h"

@implementation PhonegapIToast

- (void) addToastNotification:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
    
    iToastSettings *theSettings = [iToastSettings getSharedSettings];
    
    NSString *message      = [options objectForKey:@"message"];
    NSString *duration     = [options objectForKey:@"duration"];
    NSInteger durationTime = [[options objectForKey:@"durationTime"] intValue];
    NSString *gravity      = [options objectForKey:@"gravity"];
    NSInteger top          = [[options objectForKey:@"top"] intValue];
    NSInteger left         = [[options objectForKey:@"left"] intValue];
    
    NSInteger drTime;
    iToastGravity grv;
    
    
    if (durationTime) {
        drTime = durationTime;
    } else if ([duration isEqualToString:@"long"]) {
        drTime = iToastDurationLong;
    } else if ([duration isEqualToString:@"short"]) {
        drTime = iToastDurationShort;
    } else if ([duration isEqualToString:@"normal"]) {
        drTime = iToastDurationNormal;
    } else {
        drTime = theSettings.duration;
    }
    
    if (gravity) {
        if ([gravity isEqualToString:@"bottom"]) {
            grv = iToastGravityBottom;
        } else if ([gravity isEqualToString:@"top"]) {
            grv = iToastGravityTop;
        } else if ([gravity isEqualToString:@"center"]) {
            grv = iToastGravityCenter;
        }
    } else {
        grv = theSettings.gravity;
    }
    
    
    if (!top) {
        top = 0;
    }
    
    if (!left) {
        left = 0;
    }
    
    [[[[iToast makeText:NSLocalizedString(message, @"")]
       setGravity:grv offsetLeft:left offsetTop:top] setDuration:drTime] show];
}

@end