//
//  PhonegapIToast.h
//  testNotification
//
//  Created by Zanis on 11/7/12.
//
//

#import <Cordova/CDV.h>

@interface PhonegapIToast : CDVPlugin

- (void) addToastNotification:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end