# Extend from the official Elixir image.
FROM elixir:latest

# Create app directory and copy the Elixir projects into it.
RUN mkdir /app
COPY . /app
WORKDIR /app

# Install Hex package manager.
# By using `--force`, we don’t need to type “Y” to confirm the installation.
RUN rm -rf _build
RUN mix local.hex --force
RUN mix archive.install hex phx_new
RUN mix local.rebar --force
RUN mix deps.get
ENV SECRET_KEY_BASE=${mix phx.gen.secret}
ENV MIX_ENV=prod
RUN mix compile
RUN mix release --force
RUN _build/dev/rel/api/bin/api daemon
