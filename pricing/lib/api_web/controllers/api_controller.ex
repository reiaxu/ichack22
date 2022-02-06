defmodule ApiWeb.ApiController do
  use ApiWeb, :controller
  def search(conn, _params=%{"name" => name}) when is_binary(name) do
    json(conn, Api.single_item)
  end
  def search(conn, _params=%{"name" => names}) do
    results = names
    |> Enum.map(&Api.single_item/1)
    |> Enum.sum
    json(conn, results)
  end
  def search(conn, _) do
    resp(conn, 400, "Expected an ingredient name param for /items")
  end
end
