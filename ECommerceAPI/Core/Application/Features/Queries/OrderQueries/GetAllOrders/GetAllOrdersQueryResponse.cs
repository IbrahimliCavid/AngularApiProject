namespace Application.Features.Queries.OrderQueries.GetAllOrders
{
    public class GetAllOrdersQueryResponse
    {
        public int TotalCount {  get; set; }
        public object Orders { get; set; }
    }
}