using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Dtos.Facebook
{
    public class FacebookUserAccessTokenvalidationDto
    {
        [JsonPropertyName("data")]
        public FacebookUserAccessTokenvalidationData Data { get; set; }
    }
    public class FacebookUserAccessTokenvalidationData
    {

        [JsonPropertyName("user_id")]
        public string UserId { get; set; }
        [JsonPropertyName("is_valid")]
        public bool IsValid { get; set; }
    }
}
