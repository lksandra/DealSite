

export class Product{
    name: String;
    advertiser: {name:String};
    category: {name:String};
    description: String;
    startDate: String;
    endDate: String;
    currency: String;
    price: Number;
    discount: Number;
    url: String;
    comments: [String]
}