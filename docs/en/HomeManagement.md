# Home Management

## home.getFamily({lang})

Function: Get a list of homes and rooms

Parameter type: Object

Params:

| Name        | Type | Allows Empty | Description            |
| :-------------- | :------- | :--------------- | :------------------------- |
| lang            | String   | Y                |  option, The language. en: English, cn: Chinese          |

Response data parameters:

| Name        | Type | Allows Empty | Description            |
| :-------------- | :------- | :--------------- | :------------------------- |
| familyList      | Array    | N                | The family list            |
| currentFamilyId | String   | N                | The current family id      |


FamilyList description:

| Name | Type | Allows Empty | Description                                         |
| :------- | :------- | :--------------- | :------------------------------------------------------ |
| id       | String   | N                | The family id                                           |
| apikey   | String   | N                | The user apikey                                         |
| name     | String   | N                | The family name                                         |
| index    | Int      | N                | The family sort                                         |
| roomList | Array    | Y                | The room list                                           |                    

RoomList description:

| Name        | Type        | Allows Empty | Description                                           |
| :---------- | :---------- | :----------- | :-----------------------------------------------------|
| id	      | String	    | N	           |  The room id                                          |         
| name	      | String	    | N	           |  The room name                                        |                            
| index	      | Int	        | N	           |  Sequence number of the room, which could be negative |                

## home.addFamily({name,sort,roomNameList})

Function：Add family

Parameter type：Object

Params:

| Name        | Type | Allows Empty | Description            |
| :---------- | :----- | :------- | :-------------------------------------------- |
| name          | String   | N        | The family name    |
| sort          | Int      | N        | The family sort. 1: positive sequence, 2: reverse sequence   |
| roomNameList  | Int      | Y        | The room name list   |

Response data parameters：

| Name        | Type | Allows Empty | Description            |
| :---------- | :--------------| :------- | :-------------------------------------------|
| id	      | String	       | N	      |  The family id |         
| name	      | String	       | N	      |  The family name |                            
| index	      | Int	           | N	      |   Sequence number of the family  |     
| roomList	  | Array\<Object\>  | Y	      |  The room list，see the[home.getFamily]interface description | 

## home.addRoom({familyId,name,index})

Function：Add room

Parameter type：Object

Params:

| Name        | Type | Allows Empty | Description            |
| :---------- | :--------------| :------- | :-------------------------------------------|
| familyId	  | String	       | N	      |  The family id |         
| name	      | String	       | N	      |  The room name |                            
| sort	      | Int	           | N	      |  The room sort. 1: positive sequence, 2: reverse sequence |     

Response data parameters：

| Name        | Type | Allows Empty | Description            |
| :---------- | :--------------| :------- | :-------------------------------------------|
| id	      | String	       | N	      |  The room id |         
| name	      | String	       | N	      |  The room name |                            
| index	      | Int	           | N	      |  equence number of the room |  

## home.setFamily({id,newName})

Function：Update family information

Parameter type：Object

Params:：

| Name        | Type | Allows Empty | Description            |
| :---------- | :--------------| :------- | :-------------------------------------------|
| id	      | String	       | Y	      |  option, The family id. Default is the current family |         
| newName	  | String	       | N	      |  The new family name |                            

Response data parameters：{}

## home.setRoom({id,newName})

Function：Update room information

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :--------------| :------- | :-------------------------------------------|
| id	      | String	       | N	      |  The room id |         
| newName	  | String	       | N	      |  The new room name|    

Response data parameters：{}

## home.sortRoom({familyId,idList})

Function：Sort the rooms

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :------------| :------- | :-------------------------------------------- |
| familyId      | Array\<Object\>   | Y    | option, The family id. Default is the current family |
| idList        | String          | N    | The room id list |

Response data parameters：{}

## home.delFamily({id,deviceFamily,switchFamily})

Function：Delete family

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :------------- | :--------------| :----------- | :--------------------------------|
| id              | String      |  N         |  The family id |
| deviceFamily	  | String	    |  N	     |  Family id of mobile device  |         
| switchFamily	  | String	    |  N	     |  Family id of switch |                            

Response data parameters：{}

## home.delRoom({id})

Function：Delete room

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-----------| :------- | :------------ |
| id          | String      |  N       |  The room id |

Response data parameters：{}

## home.sortThing({familyId,thingList})

Function：Rank the things in your family

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-------------| :------- | :-------------------------------------------- |
| familyId    | String        |  Y       |  option, The family id. Default is the current family |
| thingList	  | Array\<Object\> |  N	     |  The thing list  |                                

thingList 列表 item 说明:

| Name        | Type | Allows Empty | Description            |
| :---------- | :-----------| :------- | :-------------------------------------------- |
| itemType	  | Int         |  N       |  The thing type. Default is "thing" |
| id	      | String	    |  N	   |  The thing id  |                                

Response data Parameters：{}

## home.setThing({roomId,oldThingList,newThingList})

Function：The thing about update the room

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :-----------------| :-----------| :------- | :---------------------- |
| roomId              | String      |  N       |  The room id |
| oldThingList	      | Array	    |  N	   |  The old thing list |                                
| newThingList	      | Array	    |  N	   |  The new thing list |

Response data parameters：{}

## home.switchFamily({id})

Function：Switch current family

Parameter type：Object

Params：

| Name        | Type | Allows Empty | Description            |
| :---------- | :-----------| :------- | :-------------------------------------------- |
| id          | String      |  N       |  Target family id |

Response data parameters：{}

