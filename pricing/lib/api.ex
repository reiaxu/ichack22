defmodule Api do
@rainforest 'https://api.rainforestapi.com/request'
  def foods_like(name_nonpp) do
    
    name = String.downcase(name_nonpp)
    {:ok, {_httpinfo, _headers, req}} = :httpc.request(
      @rainforest ++ '?api_key=#{ApiPriv.api_key}&type=search&amazon_domain=amazon.co.uk&search_term=#{name}&category_id=amazonfresh'
    )
    {:ok, json} = Jason.decode(req, keys: :atoms)
    results = json.search_results
    for item <- results, Regex.split(~r/[^a-zA-Z0-9]+/, item.title) |> Enum.map(&String.downcase/1) |> Enum.member?(name), do: %{title: item.title, price: %{currency: item.price.currency, amount: item.price.value}}
  end
  def single_item(name) do
    case Api.foods_like(name) do
      [hd|_] -> %{name => hd}
      [] -> %{name => "Not Found"}
    end
  end
end
