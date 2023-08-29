# DeviceManagement

## DeviceInfo

Params：:

| Name       | Type          | Allows Empty | Description            |
|:-----------|:--------------|:-------------|:-----------------------|
| deviceList | Array\<Object\> | N            | The things information |

deviceList  description： 

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :-------------------------------------------|
| name	        | String	    | N	      |  The device name |         
| deviceId	    | String	    | N	      |  The device id |                            
| apikey	    | String	    | N	      |  apikey of the user to which the device belongs |                
| extra	        | Object	    | N	      |  The contents of the factoryDevice's extra | 
| brandName     | String	    | N	      |  Brand name  |                         
| brandLogo	    | String	    | N	      |  Brand logo url |
| showBrand	    | Boolean	    | N	      |  Whether to display the brand  |
| productModel	| String	    | N	      |  Product model name |
| devGroups	    | Array\<Object\>	| Y	      |  List of all the groups the device is in |
| tags       	| Object	    | Y	      |  Tag object, which stores a custom string, and the server is only responsible for transparent transmission  |
| devConfig  	| Object	    | Y	      |  Device configuration from deviceConfig in the factorydevices list  |
| settings	    | Object	    | Y	      |  User settings. Please refer to [Change device settings] interface description  |
| family	    | Object	    | N	      |  Home of the device  |
| sharedBy	    | Object	    | Y	      |  If the device is shared by others, it will have this attribute  |
| shareTo	    | Array\<Object\>	| Y	      |  The list of shared user with whom the device has been shared |
| devicekey	    | String	    | N	      |  Factory apikey of the device |                 
| online	    |Boolean    	| N	      |  Online status  |                          
| params	    |Object     	| Y       |  Status attributes of device  |                      
| gsmInfoData	|Object	        | Y	      |  Sim card status object of GSM device  |   

extra description：

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :-------------------------------------------|
| model	        | String	    | N	      |  Firmware name |         
| ui	        | String	    | N	      |  UI name |                            
| uiid	        | Int	        | N	      |  UI ID |                
| description	| Object	    | N	      |  Notes on factory information | 
| manufacturer  | String	    | N	      |  The Manufacturer  |                         
| mac	        | String	    | N	      |  The mac address |
| apmac	        | String	    | N	      |  The ap mac address(device hotspot address)  |
| modelInfo	    | String	    | N	      |  Product model id   |
| brandId	    | String	    | N	      |  Brand id |
| chipId       	| String	    | N       |  Chip id |

settings description:

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :-------------------------------------------|
| opsNotify	     | Int	    | Y       |  Whether to notify the user of device status change (default 0) 0=no 1=yes |         
| opsHistory	 | Int	    | Y	      |  Whether to save activity logs of the device (default 1) 0=no 1=yes  |                            
| alarmNotify	 | Int	    | Y	      |  Whether to send alerts from sensors or alarms to the user (default 1) 0=Do not send 1=Send |  

devGroups  description:

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :--------------|
| type	         | Int	    | Y   |  1 represents device group |         
| groupId	     | String   | Y	  |  Id of the groups  |                            

sharedBy   description：

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :-------------------------------------------|
| permit	  | Int	      |  N	      |  User's permission value, default `0` |         
| apikey	  | String	  |  N	      |  Unique identity of the user to which the device belongs (currently using symmetric encryption of the string)|                            
| phoneNumber | String	  |  Y	      |  Mobile number of the device owner  |                
| email	      | String	  |  Y	      |  Email of the device owner | 
| nickname    | String	  |  Y        |  Nickname of the device owner        |                         
| comment	  | String	  |  Y	      |  Note of sharing |
| shareTime	  | Long	  |  Y	      |  UTC standard time, in milliseconds, used to display sorting on the client  |

devConfig  description(camera)：
| Name        | Type          | Allows Empty | Description            |
| :---------- | :------------ | :----------- | :----------------------|
| p2pServerName	  | Int	      |  Y	         |  Server Name  |         
| p2pAccout	      | String  	      |  Y	         |  Account  |                            
| p2pLicense      | String	      |  Y	         | license |   
            

family  description：

| Name        | Type          | Allows Empty | Description            |
| :---------- | :------------ | :----------- | :----------------------|
| familyId	  | String	      |  Y	         |  The familyId |         
| index	      | Int  	      |  Y	         |  The sequence number of the device, which could be a negative number  |                            
| roomId      | String	      |  Y	         |  Room id of the device |   


## device.getAllThings({lang,familyId,num,beginIndex})

Function：Get the list of Things(Only one page specified)

Description：Things include

- Devices (own and shared)
- Device Group

Parameter type：Object

Params：

| Name         | Type    | Allows Empty | Description            |
| :----------- | :------ |:-------------| :-------------------------------------------- |
| lang         | String  | Y            | option, The language. 'en' or 'cn'  |
| familyId     | String  | Y            | option, The family id. Default is currentfamilyId |
| num          | Int     | Y            | option, The number of things per page. Default is 0 means all things |
| beginIndex   | Int     | Y            | The index of the first thing. Default is -9999999 |

Response data parameter：

| Name        | Type   | Allows Empty | Description           |
| :-----------| :----- | :----------- | :-------------------- |
| thingList   | Array  | N            | The thing list   |
| total       | Int    | N            | The total number of thing  |

thingList  description：

| Name        | Type | Allows Empty | Description              |
| :--------------- | :------ | :------- | :------------------- |
| itemType         | Int     | N        | Item type 1=user’s own device 2=device shared by others 3=user's own group    |
| itemData         | Array   | N        | The id of the corresponding thing. When itemType is 1 or 2, thing id means device id. For 3 or 4, this field means group id  |
| index            | Int     | N        | Sequence number |

## device.getAllThingsAllPages({ lang, familyId, num, beginIndex })

Function: Get Thing List (All Pages)

Pass parameters and return consistent with the [device.getAllThings] interface

## device.getThings({thingList})

Function：Get the specified thing list

Parameter type：Object

Params：

| Name        | Type     | Allows Empty   | Description            |
| :---------- | :------- | :------------- | :----------------------|
| thingList   | Array    | N              | The things information |

thingList  description:

| Name        | Type | Allows Empty | Description            |
| :------------ | :----- | :------- | :--------------------- |
| itemType    | Int      | N        | The things itemType. 1: user's own device, 2: devices shared by others, 3: own group  |
| id          | String   | N        | The things id  |

Response data parameter：

| Name        | Type   | Allows Empty | Description            |
| :---------- | :----- | :----------- | :-------------------- |
| thingList   | Array  | N            | The thing list    |

## device.getThingStatus({type,id,params})

Function：Gets device or group status

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :-------------------------------------------- |
| type        | Int      | N    | The things type. 1: user's own device, 2: devices shared by others |
| id          | String   | N    | The things id |
| params      | String   | Y    | Status parameters to be obtained |

params description：

- The caller can specify that only certain status arguments are retrieved, with "|" intervals, before the URL conversion
- If you want to obtain the status of all devices or groups, the params parameter can be left blank

Response data parameter：

| Name        | Type | Allows Empty | Description           |
| :---------- | :---------| :------- | :--------------------|
| params      | Object    | N        | The status parameters to be updated     |

## device.setThingStatus({type,id,params})

Function：Update device or group status

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :------- | :------- | :-------------------------------------------- |
| type        | Int      | N        | Whether to get device or group. 1=device 2=group  |
| id          | String   | N        |  When type=1, this means deviceId. For 2, group id |
| params      | String   | N        | Status parameters to be update   |

Response data parameter：{}

## device.setAllThingStatus({thingList,timeout})

Function：Batch update the status of devices or groups

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :------------| :------- | :-------------------------------------------- |
| thingList      | Array\<Object\>   | N    | The things information |
| timeout        | String          | Y    | The timeout. 0-8000ms, default is 0ms |

thingList  description:

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :-------------------------------|
| type        | Int      | N    | The things type. 1: user's own device, 2: devices shared by others   |
| id          | String   | N    | The things id |
| params      | Object   | N    | Status parameter to be updated    |

Response data parameter：

| Name        | Type | Allows Empty | Description            |
| :------------- | :------------ | :------- | :------------------------|
| respList      | Array\<Object\>  | N        | List of responses from all things |

respList description:

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :-------------------------------|
| type        | Int      | N    | Type 1=device ,2=group   |
| id          | String   | N    | type=1 is deviceId type=2 is group id |
| error       | Int      | N    | Response error code, 0 means no error. If type=2, error is fixed to 0. If timeout is 0 when calling, error is fixed to 0 as well  |

## device.addDevice({name,deviceId,settings,ifrCode,deviceKey,chipId,familyId,roomId,sort})

Function：Add a common WiFi device

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-----------| :------- | :-------------------------------------------- |
| name        | String      |  N       |  option, The device name |
| deviceId	  | String	    |  N	   |  The device id  |         
| settings	  | Object	    |  Y	   |  option, The device settings |                            
| ifrCode     | String	    |  Y	   |  option, Code value of infrared devices |                
| deviceKey	  | String	    |  N	   |  The device apikey | 
| chipId      | String	    |  Y       |  The device chipid |                         
| familyId	  | String	    |  Y	   |  option, The device familyId |
| roomId	  | String	    |  Y	   |  option, The device roomId |
| sort	      | Int  	    |  Y	   |  The device sort. 1: positive sequence, 2: reverse sequence  |

settings  description:

| Name        | Type | Allows Empty | Description            |
| :----------   | :----- | :------- | :----------------------------------------|
| opsNotify     | Int      | Y    | Whether to notify the user of device status change (default 0) 0=no 1=yes    |
| opsHistory    | Int      | Y    | Whether to save activity logs of the device (default 1) 0=no 1=yes  |
| alarmNotify   | Int      | Y    | Whether to send alerts from sensors or alarms to the user (default 1) 0=Do not send 1=Send  |

Response data parameter：

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :-------------------------------|
| itemType    | Int      | N    | The item type |
| itemData    | Object   | N    | See the[device.getThings]interface of deviceList item description |
| index       | Int      | N    | The sequence number of the device |

Description：If the 30017 error is reported, the reason is that the brand of the device has not authorized your APPID. Currently, Cool House's own brand is authorized for free, but other manufacturers' brands will retain the right to use it. For authorization related questions, please consult our Marketing Department sales staff in the wechat docking group

## device.addGSMDevice({id,name,familyId,roomId,sort})

Function：Add device of GSM

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-----------| :------- | :-------------------------------------------- |
| id          | String      |  N       |  The GSM id|
| name	      | String	    |  N	   |  The device name |                                
| familyId	  | String	    |  Y	   |  option, The device familyId |
| roomId	  | String	    |  Y	   |  option, The device roomId  |
| sort	      | Int  	    |  Y	   |  The device sort. 1: positive sequence, 2: reverse sequence  |

Note：Application scanning equipment on the qr code can get into a URL string, URL: https://api.coolkit.cc:8080/api/user/device/addGsm?id=348512d49379bb0acace4598e14fc450, id is behind the parameters, please note that domain name is likely to change, but "/ addGsm? id={gsmId}" will not change.

Response data parameter：

| Name        | Type | Allows Empty | Description            |
| :------------- | :------------ | :------- | :------------------------|
| thingList      | Array         | N        | The things information |

thingList  description:

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :-------------------------------|
| itemType    | Int      | N    | The item type |
| itemData    | Object   | N    | See the[device.getThings]interface of deviceList  item description |
| index       | Int      | N    | The sequence number of the device  |

## device.setDeviceInfo({deviceId,newName,newRoomId})

Function：Update device/room name information

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-----------| :------- | :-------------------------------------------- |
| deviceId    | String      |  N       |  The device id |
| newName	  | String	    |  Y	   |  The device new name  |                                
| newRoomId	  | String	    |  Y	   |  The  new room id  |

Response data parameter：{}

## device.delDevice({id})

Function：Delete device

Description：You can also delete devices shared by others through this interface

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-----------| :------- | :---------- |
| id    | String      |  N       |  The device id |

Response data parameter：{}

## device.setDeviceTags({deviceId,type,tags})

Function：Modify the device label, you can modify the sub-channel name, you can implement some specific functions according to your own ideas

description：The complete tags object needs to be passed over, and the server overwrites the original value as a whole

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-----------| :------- | :-------------------------------------------- |
| deviceId    | String      |  N       |  The device id |
| type	      | String	    |  Y	   |  The type of the operation. 'replace' or 'merge'  |                                
| tags	      | Object	    |  N	   |  The tags of the device |

Response data parameter：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-----------| :------- | :------------------|
| updatedThing    | Object     |  N   |  Updated thing data |

## device.getGroups({lang})

Function: Gets the device group list

Description:
- Device groups are sorted together with devices
- Gets only the list of device groups under the current family

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-----------| :------- | :---------------------------------------|
| lang        | String      |  Y       |  option, The language. 'en' or 'cn'  |


Response data parameter：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-----------| :------- | :------------------|
| groupList   | Array       |  N       |  The group list |

groupList description:

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :-------------------------------|
| itemType    | Int      | N    | The item type|
| itemData    | Object   | N    | The group information |
| index       | Int      | N    | The sequence number of the device   |

itemData description:

| Name        | Type | Allows Empty | Description            |
| :---------- | :------------| :------- | :-------------------------------------------- |
| id              | String      |  N       |  The group id |
| name	          | String	    |  N	   |  The group name  |                                
| maindeviceId	  | String	    |  N	   |  The device group main device id. |
| family	      | Object	    |  N	   |  Family Settings for the group |
| params	      | Object      |  N	   |  Group status  |

family description:

| Name        | Type | Allows Empty | Description            |
| :---------- | :------------| :------- | :--------- |
| familyId    | String      |  N       |  The family id |
| index	      | Int	        |  N	   |  Group sort number  |                                
| roomId	  | String	    |  Y	   |  The room id |

## device.addGroup({name,mainDeviceId,familyId,roomId,sort,deviceidList})

Function：Add device group

Description：If you add a group using a device shared by someone else as the primary device, when the share is withdrawn, the group will also be deleted

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :------------| :------- | :-------------------------------------------- |
| name	          | String	        |  N	   |  The device group name  |                                
| mainDeviceId	  | String	        |  N	   |  The device group main device id. |
| familyId	      | String	        |  Y	   |  option, The device group familyId |
| roomId	      | String          |  Y	   |  option, The device group roomId  |
| sort	          | Int             |  Y	   |  The device group sort. 1: positive sequence, 2: reverse sequence  |
| deviceidList	  | Array\<String\>   |  Y	   |  The device group deviceidList  |

Response data parameter：

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :-------------------------------|
| itemType    | Int      | N    | The item type  |
| itemData    | Object   | N    | See the[device.getGroups]interface itemData description |
| index       | Int      | N    | The sequence number of the device group |

## device.setGroup({id,newName})


Function：Modifying device group

Description：Currently, only group names can be modified using this interface.

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :------------| :------- | :-------------------------------------------- |
| id          | String       |  N       |  The group id |
| newName	  | String	     |  N	    |  The new name of the group |                                

Response data parameter：{}

## device.delGroup({id})

Function：Delete a device group

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :------------| :------- | :---------|
| id          | String       |  N       |  The group id  |

Response data parameter：{}

## device.setGroupStatus({id，params})

Function：Update group status

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :------------| :------- | :-------------------------------------------- |
| id          | String       |  N       |  The group id  |                           
| params	  | Object	     |  N	    |  The group params |

Response data parameter：{}

## device.coverGroupDeviceList({id，coverDeviceidList})

Function：Update the device list in the device group

Description：The interface overwrites all devices in the group based on the incoming device list.

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :------------| :------- | :------------- |
| id              | String        |  N       |  The group id|                           
| coverDeviceidList	  | Array\<String\> |  N	     |  The device group cover device id list |

Response data parameter：

| Name        | Type | Allows Empty | Description            |
| :---------- | :------------| :------- | :------------- |
| id              | String        |  N       |  The group id|                           
| updatedThingList	  | Array |  N	     |   Update thing data |

## device.share({deviceidList,user,permit,comment,shareType})

Function：Device share

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :------------ | :------------| :------- | :------------- |                         
| deviceidList	| Array         |  N	    |  The device id list |
| user          | Object        |  N        |  The user information   |                           
| permit	    | Int           |  N	    |  The sharing permissions |
| comment       | String        |  Y        |  option, The sharing comment |                           
| shareType	    | Int           |  Y	    |  option, The sharing type |

user description：

| Name        | Type | Allows Empty | Description            |
| :------------ | :------------| :------- | :------------- |                         
| countryCode	| String         |  N	    | The user's country code |
| phoneNumber   | String         |  Y       | option, The user's phone number  |                           
| email	        | String         |  Y	    | option, The user's email |

Response data parameter：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-------------- | :------- | :-------------------------------|
| updatedThingList   | Array    | N    | Updated thing data |

## device.setShare({deviceId,apikey,permit})

Function：Update the permission of device sharing

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :------------ | :------------| :------- | :------------- |                         
| deviceId	    | String        |  N	    | The device id |
| apikey        | String        |  N        | The user's apiKey   |                           
| permit	    | Int           |  N	    | The sharing permissions |

Note：The apikey parameter comes from the device details. Search for shareTo in the documentation

Response data parameter：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-------------- | :------- | :------------------|
| updatedThingList   | Array    | N        | Updated thing data |

## device.delShare({deviceId,apikey})

Function：Unshare devices

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :------------ | :------------| :------- | :------------- |                         
| deviceId	    | String        |  N	    | The device id  |
| apikey        | String        |  N        | The user's apiKey   |

Response data parameter：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-------------- | :------- | :------------------|
| updatedThingList   | Array    | N        | Updated thing data  |

## device.getOperationHistory({deviceId,from,num})

Function：Get the operation history of the device

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :------------ | :------------| :------- | :------------- |                         
| deviceId	    | String        |  N	   | The device id  |
| from          | Long          |  Y       | The start time of the query, in the format of timestamp |
| num	        | Int           |  Y	   | The number of records to query, the default is 30, and the maximum is 30  |

Response data parameter：

| Name        | Type | Allows Empty | Description            |
| :---------- | :------------| :------- | :------------------|
| histories   | Array        | N        | History list |

histories description:

| Name        | Type | Allows Empty | Description            |
| :------------ | :------------| :------- | :------------- |                         
| deviceId	    | String        |  N	   | The device id  |                  
| userAgent	    | String        |  Y	   | Users distinguish between device and app operations |
| opsSwitchs    | String        |  Y       | Records the value of the operated channel. If it's a single channel, there's only one element with the value "switch". |
| request	    | String        |  N	   | Original  request  |
| opsAccount	| String        |  Y	   | If it is an app side operation, return the operator's account (it may be shared by the user) |                  
| opsTime	    | Long          |  N	   | Operation time stamp, accurate to millisecond |

## device.delOperationHistory({deviceId})

Function：Clear the operation history of the device

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :------------ | :------------| :------- | :------------- |                         
| deviceId	    | String       |  N	      | The device id  |

Response data parameter：{}

## device.getOTAInfo({deviceInfoList})

Function： Query OTA information about  devices

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :------------ | :------------| :--------- | :------------- |                         
| deviceInfoList	 | String     |  N       | The device information list |

deviceInfoList description：

| Name        | Type | Allows Empty | Description            |
| :------------ | :------------| :------- | :------------- |                         
| deviceId	    | String       |  N	      | The device id  |                  
| model	        | String       |  N	      | The device model  |
| version       | String       |  N       | The device current version |

Response data parameter：

| Name        | Type            | Allows Empty | Description            |
| :------------ |:----------------| :------- | :------------- |                         
| otaInfoList   | Array\<Object\> |  N     | OTA information list, if the device has upgrade information, will be in this list  |           

otaInfoList description：

| Name        | Type | Allows Empty | Description            |
| :------------ | :------------| :------- | :------------- |                         
| deviceId	    | String       |  N	      | The device id  |                  
| version       | String       |  N       | The device current version |
| binList	    | String       |  N	      | The device model  |
| type          | String       |  N       | The device current version |
| forceTime	    | String       |  N	      | The device model  |

binList description：

| Name        | Type | Allows Empty | Description            |
| :------------ | :------------| :------- | :------------- |                         
| name	        | String       |  N	      | Download file name |                  
| downloadUrl	| String       |  N	      | Download file address |
| digest        | String       |  Y       | File HASH summary(SHA256) |

