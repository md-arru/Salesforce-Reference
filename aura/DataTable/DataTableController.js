({
    init: function (cmp, event, helper) {

    var actions = [
        {label:'Show details', name: 'show_details'},
        {label:'Delete', name:'delete'}
    ]
    cmp.set('v.columns', [
        {label: 'First Name', fieldName: 'FirstName', type: 'text' ,editable: true ,sortable: true},
        {label: 'Last Name', fieldName: 'LastName', type: 'text',editable: true,sortable: true},
        {label: 'Email', fieldName: 'Email', type: 'email',editable: true,sortable: true},
        {label: 'Gender', fieldName: 'Gender', type: 'text',editable: true,sortable: true},
        {label: 'Mobile Phone', fieldName: 'MobilePhone', type: 'phone',editable: true,sortable: true},
        {type:'action', typeAttributes:{rowActions:actions}}
    ]);

        cmp.set('v.data', [
            { FirstName: 'Billy', LastName:'Simonns', Email: 'billy@salesforce.com', MobilePhone:12345, Gender:'Male'},
            { FirstName: 'Kelsey', LastName:'Denesik', Email: 'kelsey@salesforce.com', MobilePhone:12345, Gender:'Female' },
            { FirstName: 'Kyle', LastName:'Ruecker', Email: 'kyle@salesforce.com', MobilePhone:12345, Gender:'Male' },
            { FirstName: 'Krystina', LastName:'Kerluke', Email: 'krystina@salesforce.com', MobilePhone:12345, Gender:'Male' }
        ]);
        var items = [{
                "label": "Tekclan software solutions pvt. ltd",
                "name": "1",
                "expanded": true,
                "items": [{
                    "label": "Company Admin",
                    "name": "2",
                    "metatext": "Head Admin",
                    "expanded": true,
                    "items" :[{
                        "label": "Company Employee",
                        "name": "3",
                        "expanded": true,
                        "items" :[{
                            "label": "Erica Fernendez",
                            "name": "4",
                            "expanded": true,
                            "items" :[]
                        }]
                    }, {
                        "label": "Company Driver",
                        "name": "5",
                        "expanded": false,
                        "items" :[{
                            "label": "Meshak A",
                            "name": "6",
                            "expanded": true,
                            "items" :[]
                        }]  
                    }]
                }]   
    }];     
        cmp.set('v.items', items);

        
        var columns = [
            {
                type: 'text',
                fieldName: 'roleName',
                label: 'Role Name',
                initialWidth: 300
            },
            
            {
                type: 'phone',
                fieldName: 'phone',
                label: 'Phone Number'
            },

            {
                type: 'text',
                fieldName: 'description',
                label: 'Description'
            },         {type:'action', typeAttributes:{rowActions:actions}}

        ];

        cmp.set('v.gridColumns', columns);

        // data
        var nestedData = [

            {
                "name": "123556",
                "roleName": "Tekclan software solutions pvt. ltd",
                "description":"",
                "phone": "837-555-1212",
                "_children": [
                    {
                        "name": "123556-A",
                        "roleName": "Company Admin",
                        "phone": "837-555-1212",
                        "description":"Head Admin ",
                        "_children": [
                            {
                                "name": "123556-A-A",
                                "roleName": "Company Employee",
                                "phone": "837-555-1212",
                                "description":"Employee who travels in cab",
                                "_children": [
                                    {
                                        "name": "123556-A-A",
                                        "roleName": "Erica Fernendez",
                                        "phone": "837-555-1212",
                                        "description":"Employee"
                                    }]
                                },
                            {
                                "name": "123556-A-B",
                                "roleName": "Company Drivers",
                                "phone": "837-555-1212",
                                "description":"Drivers who drives the cab",
                                "_children": [
                                    {
                                        "name": "123556-A-A",
                                        "roleName": "Meshak A",
                                        "phone": "837-555-1212",
                                        "description":"Driver"
                                    }]
                                }]

                               
                            }
                        ]
                    }]

        cmp.set('v.gridData', nestedData);
        var expandedRows = ["123556"];
        cmp.set('v.gridExpandedRows', expandedRows);
    
    },
    
    handleSelect: function (cmp, event) {
        event.preventDefault();
        var mapping = { '1' : 'User', '2' : 'Standard User', '3' : 'Chatter User',
            '4' : 'Administrator', '5' : 'System Administrator', '6' : 'Chatter Administrator',
            '7' : 'Community User', '8' : 'Community Login User', '9' : 'Community Plus Login User'};
        cmp.set('v.selected', mapping[event.getParam('name')]);
    },

handleRowAction : function(cmp,event,helper){
    var action = event.getParam('action');
    var row = event.getParam('row');
    
    switch(action.name){
        case 'show_details':
            alert("Showing Details "+ JSON.stringify(row));
            break;
        case 'delete':
            helper.remove(cmp,row);
            break;    
    }
},

updateSelectedText: function(cmp,event,helper){
    var selectedRows = event.getParam('selectedRows');
    cmp.set('v.selectedRowsCount',selectedRows.length)
    
},
addRecords:function(cmp, event, helper){
    alert("To add a Record..");
},
deleteRecord:function(cmp, event, helper){
    alert("Delete selected records");
},

updateColumnSorting: function (cmp, event, helper) {
    cmp.set('v.isLoading', true);
    setTimeout($A.getCallback(function() {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
        cmp.set('v.isLoading', false);
    }), 0);
    
},
});