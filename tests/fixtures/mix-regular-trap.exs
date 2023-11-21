defmodule HelloWorld.MixProject do
  use Mix.Project

  def some_config do
    [
      app: :hello_world,
      version: "1.2.3",
      some_config_key: "some string"
    ]
  end

  def project do
    [
      app: :hello_world,
      version: "{{VERSION}}",
      elixir: "~> 1.15",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def some_other_config do
    [
      app: :hello_world,
      version: "4.5.6",
      some_other_config_key: "some other string"
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
    ]
  end
end
