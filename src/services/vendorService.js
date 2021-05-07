const KEYS = {
    vendors: 'vendors',
    vendorId: 'vendorId'
}

export const getStateCollection = () => ([
    { id: '1', title: 'Mumbai' },
    { id: '2', title: 'Pune' },
    { id: '3', title: 'Aurangabad' },
    { id: '4', title: 'Banglore' },
])

export const getTypeOfSupplierCollection = () => ([
    { id: '1', title: 'AUTOMOBILE' },
    { id: '2', title: 'BRASS HARDWARE & COMPONENTS' },
    { id: '3', title: 'CHEMICALS' },
    { id: '4', title: 'COMPUTER HARDWARE & SOFTWARE' },
])

export const getProdSegNameCollection = () => ([
    { id: '1', title: 'Trader' },
    { id: '2', title: 'Manufacturer' },
    { id: '3', title: 'Service Provider' },
])

export const getrolenameCollection = () => ([
    { id: '1', title: 'User' },
    { id: '2', title: 'Approve' },
])

export function insertVendor(data) {
    let vendors = getAllVendors();
    data['id'] = generateEmployeeId()
    vendors.push(data)
    localStorage.setItem(KEYS.vendors, JSON.stringify(vendors))
}

export function updateVendor(data) {
    let vendors = getAllVendors();
    let recordIndex = vendors.findIndex(x => x.id === data.id);
    vendors[recordIndex] = { ...data }
    localStorage.setItem(KEYS.vendors, JSON.stringify(vendors));
}

export function deleteEmployee(id) {
    let vendors = getAllVendors();
    vendors = vendors.filter(x => x.id !== id)
    localStorage.setItem(KEYS.vendors, JSON.stringify(vendors));
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.vendorId) == null)
        localStorage.setItem(KEYS.vendorId, '0')
    var id = parseInt(localStorage.getItem(KEYS.vendorId))
    localStorage.setItem(KEYS.vendorId, (++id).toString())
    return id;
}

export function getAllVendors() {
    if (localStorage.getItem(KEYS.vendors) == null)
        localStorage.setItem(KEYS.vendors, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.vendors));
    // let vendors = JSON.parse(localStorage.getItem(KEYS.vendors));
    //map departmentID to department title
    // let states = getStateCollection();
    // let toscs = getTypeOfSupplierCollection();
    // let prodsegnames = getProdSegNameCollection();
    // return vendors.map(x => ({
    //     ...x,
    //     state: states[x.stateId - 1].title,
    //     tosc: toscs[x.toscId - 1].title,
    //     prodsegname: prodsegnames[x.prodsegnameId - 1].title
    // }))
}