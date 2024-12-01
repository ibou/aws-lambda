import boto3
import os

def lambda_handler(event, context):
    print("Hello, World!")
    user = event["user"]
    visit_count: int = 0
    
    #create a dynamoDB client
    dynamodb = boto3.resource('dynamodb')
    table_name = os.environ["TABLE_NAME"]
    table = dynamodb.Table(table_name) 
    #get the item from the table
    response = table.get_item(Key={"user": user})
   
    if "Item" in response:
        visit_count = response["Item"]["visit_count"]
        
    #increment the visit count
    visit_count += 1
    
    #update the item in the table
    table.put_item(Item={"user": user, "visit_count": visit_count})
    
    message = f"Hello, {user}! You've visited {visit_count} times." 
    return {"message": message}

if __name__ == "__main__":
    event = {"user": "Hubay"}
    os.environ["TABLE_NAME"] = "visit-count-table"
    res = lambda_handler(event, None)
    print(res)


